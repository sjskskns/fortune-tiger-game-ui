// Configurações
const API_URL = 'http://localhost:3000'; // Alterar para seu IP/domínio
const CONFIG = {
    cs: 0.02,
    ml: 1,
    token: localStorage.getItem('token') || 'seu-token-aqui'
};

let gameState = {
    isSpinning: false,
    isAutoSpinning: false,
    autoSpinsCount: 0,
    balance: 1000,
    totalWin: 0,
    currentBet: 0
};

// Elementos DOM
const spinBtn = document.getElementById('spinBtn');
const autoBtn = document.getElementById('autoBtn');
const statusBar = document.getElementById('status');
const balanceDisplay = document.getElementById('balance');
const winDisplay = document.getElementById('win');
const totalBetDisplay = document.getElementById('totalBet');
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');

// Event Listeners para CS
document.querySelectorAll('.btn-cs').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.btn-cs').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        CONFIG.cs = parseFloat(this.dataset.cs);
        updateBetDisplay();
    });
});

// Event Listeners para ML
document.querySelectorAll('.btn-ml').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.btn-ml').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        CONFIG.ml = parseInt(this.dataset.ml);
        updateBetDisplay();
    });
});

// Atualizar display da aposta
function updateBetDisplay() {
    gameState.currentBet = CONFIG.cs * CONFIG.ml * 20; // 20 linhas de pagamento
    totalBetDisplay.textContent = `R$ ${gameState.currentBet.toFixed(2)}`;
}

// Botão Spin
spinBtn.addEventListener('click', () => {
    if (!gameState.isSpinning && gameState.balance >= gameState.currentBet) {
        spin();
    }
});

// Botão Auto Spin
autoBtn.addEventListener('click', () => {
    gameState.isAutoSpinning = !gameState.isAutoSpinning;
    autoBtn.classList.toggle('active');
    
    if (gameState.isAutoSpinning) {
        autoBtn.textContent = 'PARAR AUTO';
        gameState.autoSpinsCount = 0;
        startAutoSpin();
    } else {
        autoBtn.textContent = 'AUTO GIRAR';
    }
});

// Função de Spin
async function spin() {
    if (gameState.isSpinning) return;
    
    gameState.isSpinning = true;
    spinBtn.disabled = true;
    statusBar.textContent = 'Girando...';
    statusBar.style.color = '#3498db';

    // Descontar aposta
    gameState.balance -= gameState.currentBet;
    updateDisplay();

    // Animar reels
    animateReels();

    try {
        // Chamar API do jogo
        const response = await fetch(`${API_URL}/web-api/game-proxy/v2/spin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                atk: CONFIG.token,
                cs: CONFIG.cs,
                ml: CONFIG.ml
            })
        });

        const data = await response.json();
        
        // Simular resultado
        setTimeout(() => {
            displayResult(data);
        }, 2000);

    } catch (error) {
        console.error('Erro:', error);
        statusBar.textContent = 'Erro na conexão. Tente novamente.';
        statusBar.style.color = '#e74c3c';
        gameState.isSpinning = false;
        spinBtn.disabled = false;
    }
}

// Animar Reels
function animateReels() {
    const reels = [reel1, reel2, reel3];
    reels.forEach((reel, index) => {
        reel.classList.add('fast-spin');
        setTimeout(() => {
            reel.classList.remove('fast-spin');
            reel.classList.add('spinning');
        }, 800 + index * 200);
    });
}

// Exibir Resultado
function displayResult(data) {
    try {
        const result = data.dt.si;
        const winAmount = result.tw || 0;
        
        // Mostrar resultado nos reels
        if (result.orl) {
            displaySymbols(result.orl);
        }

        // Atualizar saldo
        gameState.balance += winAmount;
        gameState.totalWin = winAmount;
        updateDisplay();

        if (winAmount > 0) {
            statusBar.textContent = `🎉 VITÓRIA! Ganhou R$ ${winAmount.toFixed(2)}`;
            statusBar.style.color = '#27ae60';
            document.querySelector('.game-container').classList.add('win');
            playWinAnimation();
        } else {
            statusBar.textContent = 'Sem ganhos desta vez...';
            statusBar.style.color = '#e74c3c';
        }

        gameState.isSpinning = false;
        spinBtn.disabled = false;

        if (gameState.isAutoSpinning) {
            setTimeout(spin, 1000);
        }

    } catch (error) {
        console.error('Erro ao processar resultado:', error);
        statusBar.textContent = 'Erro ao processar resultado';
        statusBar.style.color = '#e74c3c';
        gameState.isSpinning = false;
        spinBtn.disabled = false;
    }
}

// Exibir Símbolos nos Reels
function displaySymbols(orl) {
    const reels = [reel1, reel2, reel3];
    const symbols = [
        ['0.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png']
    ];

    orl.forEach((symbolIndex, position) => {
        const reelIndex = Math.floor(position / 3);
        if (reelIndex < 3) {
            const reel = reels[reelIndex];
            const symbolElements = reel.querySelectorAll('.slot-symbol');
            
            // Calcular a posição correta
            const correctIndex = symbolIndex % 8;
            
            // Rolar para a posição correta
            const scrollAmount = correctIndex * 100;
            reel.style.transform = `translateY(-${scrollAmount}px)`;
        }
    });
}

// Animação de Vitória
function playWinAnimation() {
    const container = document.querySelector('.game-container');
    container.classList.add('win');
    setTimeout(() => {
        container.classList.remove('win');
    }, 600);
}

// Atualizar Display
function updateDisplay() {
    balanceDisplay.textContent = `R$ ${gameState.balance.toFixed(2)}`;
    winDisplay.textContent = `R$ ${gameState.totalWin.toFixed(2)}`;
}

// Auto Spin
function startAutoSpin() {
    if (gameState.isAutoSpinning && gameState.balance >= gameState.currentBet) {
        gameState.autoSpinsCount++;
        spin();
    } else {
        gameState.isAutoSpinning = false;
        autoBtn.classList.remove('active');
        autoBtn.textContent = 'AUTO GIRAR';
        statusBar.textContent = 'Auto Spin finalizado';
        statusBar.style.color = '#3498db';
    }
}

// Inicializar
updateBetDisplay();
updateDisplay();

// Mostrar mensagem de boas-vindas
statusBar.textContent = 'Bem-vindo! Aperte GIRAR para começar';
statusBar.style.color = '#f39c12';