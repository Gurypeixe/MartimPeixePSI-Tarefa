const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

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
  res.json(cards);
});

app.get("/cartas", (req, res) => {
  res.json(cards);
});

app.post("/api/cartas", (req, res) => {
  const card = req.body;
  if (!card.id) {
    card.id = cards.length > 0 ? Math.max(...cards.map((c) => c.id || 0)) + 1 : 1;
  }
  cards.push(card);
  res.status(201).json(card);
});

app.use((req, res) => {
  res.status(404).send("<h1>404 - Página não encontrada</h1>");
});

app.listen(PORT, () => {
  console.log("http://localhost:3000");
});
