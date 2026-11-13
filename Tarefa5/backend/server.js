const express = require("express");

const app = express();
const PORT = 3000;

const cards = [
  { id: 1, name: "Dragão", type: "Criatura", attack: 7, defense: 5 },
  { id: 2, name: "Mago", type: "Mago", attack: 4, defense: 6 },
  { id: 3, name: "Cavaleiro", type: "Guerreiro", attack: 8, defense: 4 },
  { id: 4, name: "Fénix", type: "Criatura", attack: 9, defense: 3 },
  { id: 5, name: "Elfo", type: "Criatura", attack: 5, defense: 8 }
];

app.get("/", (req, res) => {
  res.send(
    "<h1>A minha coleção</h1>" +
    `<p>Tenho ${cards.length} cartas.</p>`
  );
});

app.get("/api/cartas", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:5173");
  res.json(cards);
});

app.use((req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:5173");
  res.status(404).send("<h1>404 - Página não encontrada</h1>");
});

app.listen(PORT, () => {
  console.log("http://localhost:3000");
});
