# 🔧 Guia de Instalação no Termux

## Requisitos

- Termux instalado no Android
- Conexão com internet
- Seu servidor API rodando (porta 3000)

## Passo 1: Atualizar Termux

```bash
pkg update && pkg upgrade -y
```

## Passo 2: Instalar Dependências

```bash
pkg install -y git python
```

## Passo 3: Clonar o Repositório

```bash
cd ~
git clone https://github.com/sjskskns/fortune-tiger-game-ui.git
cd fortune-tiger-game-ui
```

## Passo 4: Iniciar o Servidor

```bash
python -m http.server 8000
```

Você verá algo como:
```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

## Passo 5: Acessar no Navegador

1. Abra o navegador do seu Android
2. Digite: `http://localhost:8000`
3. OU use seu IP local: `http://seu-ip:8000`

### Encontrar seu IP Local no Termux:

```bash
ifconfig | grep "inet addr"
# ou
hostname -I
```

Procure por um IP como `192.168.x.x` ou `10.0.x.x`

## Passo 6: Configurar Conexão com API

Edite o arquivo `game.js`:

```bash
nano game.js
```

Procure pela linha:
```javascript
const API_URL = 'http://localhost:3000';
```

Se seu servidor está em outro celular ou PC, altere para:
```javascript
const API_URL = 'http://192.168.x.x:3000'; // Use o IP do servidor
```

Salve com: `Ctrl + X` → `Y` → `Enter`

## Passo 7: Adicionar Imagens dos Símbolos

### Opção A: Download das Imagens

```bash
mkdir -p assets/symbols
cd assets/symbols

# Faça download das imagens e coloque aqui
# Nomeie como: 0.png, 1.png, 2.png... 7.png

cd ~/fortune-tiger-game-ui
```

### Opção B: Criar Imagens Placeholder (Rápido)

Se não tiver as imagens, pode criar rápido com este script:

```bash
python create_symbols.py
```

## Passo 8: Manter o Servidor Rodando

Para rodar em background:

```bash
nohup python -m http.server 8000 > server.log 2>&1 &
```

Para parar:

```bash
pkill -f "http.server"
```

Para ver logs:

```bash
tail -f server.log
```

## 🎮 Testando o Jogo

1. Abra seu navegador no Android
2. Vá para `http://localhost:8000`
3. A interface deve carregar sem tela de loading
4. Configure o token no `game.js` se necessário

## ⚠️ Troubleshooting

### "Connection refused" ao girar

**Problema:** Não consegue conectar à API

**Solução:**
```bash
# Verifique se o servidor API está rodando
# No outro terminal/dispositivo, verifique com:
netstat -tuln | grep 3000

# Se não estiver, inicie o servidor:
npm start  # ou o comando do seu servidor
```

### Imagens não carregam

**Problema:** Os símbolos aparecem em branco

**Solução:**
```bash
# Verifique se a pasta existe
ls -la assets/symbols/

# Se não existir, crie:
mkdir -p assets/symbols

# Adicione as imagens PNG (0.png até 7.png)
```

### Porta 8000 já em uso

**Problema:** "Address already in use"

**Solução:**
```bash
# Use outra porta
python -m http.server 9000

# Acesse: http://localhost:9000
```

### Não consegue acessar de outro dispositivo

**Problema:** `http://192.168.x.x:8000` não carrega

**Solução:**
```bash
# Verifique o firewall
# No Termux, use:
python -m http.server 0.0.0.0:8000

# Verifique que ambos os dispositivos estão na mesma rede
ping 192.168.x.x
```

## 📱 Usando com Dois Celulares

### Celular 1 (Servidor API)
```bash
cd api-pgsoft-node
npm start
# Anote o IP: 192.168.x.x1
```

### Celular 2 (Interface do Jogo)
```bash
cd fortune-tiger-game-ui
# Edite game.js e mude API_URL para:
# const API_URL = 'http://192.168.x.x1:3000';

python -m http.server 8000
# Acesse: http://localhost:8000
```

## 💡 Dicas Úteis

1. **Auto-refresh ao editar código:**
   ```bash
   # Instale watch-server
   pip install watchdog
   ```

2. **Ver requisições em tempo real:**
   ```bash
   # Em outro terminal Termux
   tail -f server.log
   ```

3. **Fazer backup antes de mexer:**
   ```bash
   cp -r fortune-tiger-game-ui fortune-tiger-game-ui.backup
   ```

4. **Testar conexão com API:**
   ```bash
   # No console do navegador (F12):
   fetch('http://seu-ip:3000/web-api/game-proxy/v2/...')
   ```

## 🚀 Iniciar Automaticamente ao Abrir Termux

Crie um script `~/.termux/boot/start-game.sh`:

```bash
mkdir -p ~/.termux/boot
nano ~/.termux/boot/start-game.sh
```

Adicione:
```bash
#!/bin/bash
cd ~/fortune-tiger-game-ui
python -m http.server 8000
```

Salve e dê permissão:
```bash
chmod +x ~/.termux/boot/start-game.sh
```

Agora o servidor inicia automaticamente!

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs: `tail -f server.log`
2. Teste a conexão: `curl http://localhost:3000`
3. Verifique o firewall do seu roteador
4. Reinicie o Termux e tente novamente
