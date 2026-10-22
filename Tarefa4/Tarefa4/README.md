# Ficha 4 - PSI

## 1. Tarefas da Parte A
Todas as tarefas de 1 a 5 foram concluídas com sucesso, cada uma no seu respetivo commit conforme solicitado.

## 2. Como pôr tudo a correr
Agora são necessários **dois terminais**:

**Terminal 1 (Server / Backend):**
```bash
cd backend
npm install
node server.js
```
*(O servidor Express arranca em `http://localhost:3000`)*

**Terminal 2 (Client / Frontend):**
```bash
cd frontend
npm install
npm run dev
```
*(A aplicação React abre em `http://localhost:5173`)*

## 3. Quem bloqueou: o server ou o browser? Como é que sabes?
Quem bloqueou foi o **browser**, através do mecanismo de proteção de CORS (*Same-Origin Policy*).
Sabemos disto porque o pedido chega efetivamente ao servidor: no terminal do server vemos que o request foi recebido e respondido sem erros. No entanto, ao receber a resposta, o browser verifica que falta o cabeçalho `Access-Control-Allow-Origin` e, por segurança, impede a aplicação React de aceder aos dados.

## 4. Comparação com a Ficha 3: Requests, Dados e HTML
Ao abrir a página, a aplicação React faz agora **1 request** (`fetch` inicial para obter as cartas em JSON) e faz **0 requests** ao filtrar, pesquisar ou sortear cartas, visto que essas operações são processadas diretamente na memória do cliente.
Os dados agora vivem no **servidor** (backend na base/memória do Express), mas o HTML continua a ser inteiramente construído no **browser** (cliente) via componentes React.