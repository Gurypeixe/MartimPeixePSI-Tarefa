const express = require("express");

const app = express();
const PORT = 3000;

const cards = [
  { name: "Dragão", type: "Criatura", attack: 7, defense: 5 },
  { name: "Mago", type: "Mago", attack: 4, defense: 6 },
  { name: "Cavaleiro", type: "Guerreiro", attack: 8, defense: 4 },
  { name: "Fénix", type: "Criatura", attack: 9, defense: 3 },
  { name: "Guardião", type: "Criatura", attack: 5, defense: 8 }
];

app.get("/", (req, res) => {
  res.send(
    "<h1>A minha coleção</h1>" +
    `<p>Tenho ${cards.length} cartas.</p>`
  );
});

app.get("/sobre", (req, res) => {
  res.send(
    "<h1>Sobre mim</h1>" +
    "<p>Nome: O teu nome</p>" +
    "<p>Turma: A tua turma</p>"
  );
});

app.get("/cartas", (req, res) => {
  const lista = cards.map(card =>
    `<li>${card.name} - ${card.type} - ${card.attack}/${card.defense}</li>`
  ).join("");

  res.send(
    "<h1>Cartas</h1>" +
    `<ul>${lista}</ul>`
  );
});

app.get('/cartas/aleatoria', (req, res) => {
  const card = cards[Math.floor(Math.random() * cards.length)];

  res.send(`
    <h1>${card.nome}</h1>
    <p>Tipo: ${card.tipo}</p>
    <p>Ataque: ${card.ataque}</p>
    <p>Defesa: ${card.defesa}</p>
  `);
});


app.get("/agora", (req, res) => {
  res.send(`<h1>${new Date().toLocaleString("pt-PT")}</h1>`);
});

app.use((req, res) => {
  res.status(404).send("<h1>404 - Página não encontrada</h1>");
});

app.listen(PORT, () => {
  console.log("http://localhost:3000");
});
