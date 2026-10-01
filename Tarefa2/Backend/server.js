const http = require("http");

const PORT = 3000;

const cards = [
  { name: "Dragão", type: "Criatura", attack: 7, defense: 5 },
  { name: "Mago", type: "Mago", attack: 4, defense: 6 },
  { name: "Cavaleiro", type: "Guerreiro", attack: 8, defense: 4 },
  { name: "Fénix", type: "Criatura", attack: 9, defense: 3 },
  { name: "Guardião", type: "Criatura", attack: 5, defense: 8 }
];

const server = http.createServer((req, res) => {

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
      <h1>A minha coleção</h1>
      <p>Tenho ${cards.length} cartas.</p>
    `);
    return;
  }

  if (req.url === "/sobre") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
      <h1>Sobre mim</h1>
      <p>Nome: O teu nome</p>
      <p>Turma: A tua turma</p>
    `);
    return;
  }

  if (req.url === "/cartas") {
    const lista = cards.map(card =>
      `<li>${card.name} - ${card.type} - ${card.attack}/${card.defense}</li>`
    ).join("");

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
      <h1>Cartas</h1>
      <ul>${lista}</ul>
    `);
    return;
  }

  if (req.url === "/agora") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<h1>${new Date().toLocaleString("pt-PT")}</h1>`);
    return;
  }

  res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  res.end("<h1>404 - Página não encontrada</h1>");
});

server.listen(PORT, () => {
  console.log("http://localhost:3000");
});
