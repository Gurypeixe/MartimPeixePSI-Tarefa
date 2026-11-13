# Ficha 5 — Redes de Comunicação (Módulo 5, Aulas 6 e 7)

## Como Executar

1. **Servidor (Backend)**:
   ```bash
   cd Tarefa5/backend
   npm install
   node server.js
   # Servidor a correr em http://localhost:3000
   ```

2. **Cliente (Frontend React)**:
   ```bash
   cd Tarefa5/frontend
   npm install
   npm run dev
   # Aplicação a correr em http://localhost:5173
   ```

---

## 2. API — Rotas do Servidor

| Método | URL | O que recebe | O que responde | Códigos de Status |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/cartas` (e `/cartas`) | Nada | Array JSON com a lista de cartas | `200 OK` |
| **POST** | `/api/cartas` | JSON no Body: `{ name, type, attack }` | Objeto JSON da carta criada (com `id`) | `201 Created` (sucesso)<br>`400 Bad Request` (sem nome ou tipo) |
| **DELETE** | `/api/cartas/:id` | Parâmetro `id` no URL | Confirmação de remoção da carta | `200 OK` (apagada)<br>`404 Not Found` (não encontrada) |

---

## 3. Resposta à Pergunta 3

> **Quando acrescentas uma carta, o Network tab mostra dois requests para `/api/cartas`. Qual é o primeiro, quem o manda, e porque é que, antes do pacote `cors`, o `console.log` da rota POST nunca aparecia no terminal?**

O primeiro pedido é um **OPTIONS**, denominado requisição de **preflight**, enviado automaticamente pelo **browser** para verificar se o servidor aceita pedidos cross-origin (`http://localhost:5173`) com cabeçalhos JSON (`Content-Type: application/json`).
Antes de usarmos o pacote `cors`, o servidor Express não respondia ao preflight com os cabeçalhos CORS necessários; por essa razão, o browser bloqueava e abortava a operação antes de emitir o `POST`, fazendo com que este nunca chegasse ao servidor e o `console.log` da rota POST nunca fosse executado no terminal.

---

## 4. Resposta à Pergunta 4

> **Nas três versões da aula (só `setCards`, POST sem ficheiro, POST com `cartas.json`), onde vivia a carta nova, e o que a apagava? (Pista: F5 na app, e reiniciar o server.)**

1. **Só `setCards`**: A carta nova vivia apenas na memória RAM do browser (no estado do React); era apagada ao fazer **F5** (recarregar a página).
2. **POST sem ficheiro**: A carta nova vivia na memória RAM do processo Node.js (no array JavaScript do servidor); resistia ao F5, mas era apagada ao **reiniciar o servidor** (Ctrl+C e arrancar novamente).
3. **POST com `cartas.json`**: A carta nova vive armazenada em disco no ficheiro `cartas.json` (armazenamento persistente); resiste tanto ao **F5** como a **reiniciar o servidor**, apenas sendo apagada se o ficheiro for alterado manualmente ou através de uma rota de remoção (DELETE).

---

## Extras Implementados

- **Botão «Apagar» por carta**: Implementada rota `DELETE /api/cartas/:id` com persistência no `cartas.json` e remoção no estado do cliente através da prop `onDelete` no componente `Card`.
- **Estado de envio («A enviar…»)**: O botão de submissão do formulário fica desativado e exibe o texto «A enviar…» enquanto o POST está pendente. Isto é crucial num `POST` (operação não-idempotente) para evitar que múltiplos cliques do utilizador criem registos duplicados no servidor, ao passo que num `GET` (operação idempotente e apenas de leitura) requisições repetidas não alteram os dados.
