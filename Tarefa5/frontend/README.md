1. Foi Executado como pedido
2. Abrimos o cmd fazemos no meu caso: C:\Users\2224098\Documents\GitHub\MartimPeixePSI-Tarefa2 depois cd Tarefa3 depois npm run dev
3. no express ele é construido na memoria no servidor por isso ele aparece e no react ele é contruido num esqueleto html (Cliente)
4. O Express faz pedidos de navegação completos (retornando novo HTML e recarregando a página), ja o React faz 0 pedidos (se os dados estiverem em memória) ou apenas 1 pedido fetch/JSON à API se tiver api. Isto acontece porque o Express é uma Multi-Page Application (MPA) que renderiza no servidor, e o React é uma Single-Page Application (SPA) que gere as rotas e o estado diretamente no browser sem recarregar a página.

Usei ia, para a pergunta 3 e 4!! + Ajuda do professor porque não sou genio...