1. Foi executado como pedido (tarefas 1 a 5 com um commit por tarefa).

2. Abrimos dois terminais no cmd:
- Terminal 1 (server): cd backend e depois node server.js
- Terminal 2 (client): cd frontend e depois npm run dev

3. Quem bloqueou foi o browser. Sabemos isto porque no terminal do servidor vemos que o pedido chegou lá e foi respondido normalmente, mas como faltava o header do CORS, o browser bloqueou o JavaScript de aceder aos dados por segurança.

4. Ao abrir faz 1 request (o fetch para puxar as cartas) e ao filtrar faz 0 requests porque filtra na memória do cliente. Os dados agora vivem no servidor (backend), mas o HTML continua a ser construído no browser (cliente) pelo React.