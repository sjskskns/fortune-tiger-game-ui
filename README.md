# Fortune Tiger Game UI

Interface interativa do jogo Fortune Tiger com animações de botões, slots e suporte para rodar no Termux.

## 📋 Características

- ✨ Animações suaves de slots
- 🎯 Botões interativos com efeitos visuais
- 📱 Interface responsiva
- 🎰 Sistema de aposta (CS e ML)
- 🔄 Auto Spin
- 💰 Exibição de saldo e ganhos
- 🎨 Design moderno com gradientes

## 🚀 Como Usar

### No Desktop

```bash
# Abra o arquivo index.html no navegador
# Ou use um servidor local:
python -m http.server 8000
# Depois acesse: http://localhost:8000
```

### No Termux

```bash
# Instale as dependências
pkg update && pkg upgrade
pkg install python

# Clone o repositório
cd ~
git clone https://github.com/sjskskns/fortune-tiger-game-ui.git
cd fortune-tiger-game-ui

# Inicie o servidor
python -m http.server 8000

# Acesse pelo navegador do seu celular
# http://seu-ip-local:8000
```

## 📁 Estrutura de Pastas

```
fortune-tiger-game-ui/
├── index.html          # Arquivo principal HTML
├── styles.css          # Estilos e animações
├── game.js             # Lógica do jogo
├── package.json        # Informações do projeto
├── README.md           # Documentação
└── assets/             # Imagens dos símbolos (criar manualmente)
    └── symbols/
        ├── 0.png       # Wild
        ├── 1.png       # Orange
        ├── 2.png       # Gold Pot
        ├── 3.png       # Bracelet
        ├── 4.png       # Coins
        ├── 5.png       # Red Card
        ├── 6.png       # Blue Straw
        └── 7.png       # Orange 2
```

## ⚙️ Configuração

Edite o arquivo `game.js` para definir:

```javascript
const API_URL = 'http://seu-ip-local:3000'; // URL do seu servidor API
const CONFIG = {
    cs: 0.02,           // Coin Size padrão
    ml: 1,              // Multiplicador padrão
    token: 'seu-token'  // Token do usuário
};
```

## 🎮 Como Jogar

1. Selecione o **Coin Size (CS)** - quanto mais alto, maior a aposta
2. Selecione o **Multiplicador (ML)** - multiplica a aposta final
3. Veja a **Aposta Total** calculada automaticamente
4. Clique em **GIRAR** para começar
5. Use **AUTO GIRAR** para rodadas automáticas

## 🔧 Personalizações

### Mudar Cores
Edite as variáveis CSS em `styles.css`:

```css
:root {
    --primary-color: #FFD700;        /* Cor primária (ouro) */
    --dark-bg: #1a1a2e;              /* Fundo escuro */
    --accent-color: #f39c12;         /* Cor de destaque */
    --success-color: #27ae60;        /* Cor de vitória */
}
```

### Adicionar Símbolos
Adicione imagens PNG dos símbolos na pasta `assets/symbols/` com os nomes `0.png` até `7.png`.

## 📱 Suporte

- Chrome/Firefox/Safari (Desktop)
- Chrome Mobile (Android)
- Termux (com Python)

## 🐛 Troubleshooting

### "CORS error" ao conectar com API
- Certifique-se que o servidor API está rodando
- Verifique se o IP e porta estão corretos
- Adicione CORS headers no servidor backend

### Imagens não aparecem
- Verifique se os arquivos PNG estão em `assets/symbols/`
- Nomeie os arquivos como `0.png`, `1.png`, etc.

### Não consegue acessar do celular
- Use `ipconfig` (Windows) ou `ifconfig` (Linux/Mac) para pegar seu IP local
- Acesse `http://seu-ip-local:8000`

## 📄 Licença

MIT - Sinta-se livre para usar e modificar!
