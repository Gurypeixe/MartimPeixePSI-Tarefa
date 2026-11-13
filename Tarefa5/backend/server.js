const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const DATA_FILE = path.join(__dirname, "cartas.json");

function getCards() {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

function saveCards(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

let cards = getCards();

app.get("/", (req, res) => {
  cards = getCards();
  res.send(
    "<h1>A minha coleção</h1>" +
    `<p>Tenho ${cards.length} cartas.</p>`
  );
});

app.get("/api/cartas", (req, res) => {
  cards = getCards();
  res.json(cards);
});

app.get("/cartas", (req, res) => {
  cards = getCards();
  res.json(cards);
});

app.post("/api/cartas", (req, res) => {
  const { name, type, attack } = req.body;

  // Validação: 400 se faltar nome ou tipo
  if (!name || !name.trim() || !type || !type.trim()) {
    return res.status(400).json({ error: "HTTP 400 - Nome e tipo são obrigatórios" });
  }

  cards = getCards();
  const card = {
    id: cards.length > 0 ? Math.max(...cards.map((c) => c.id || 0)) + 1 : 1,
    name: name.trim(),
    type: type.trim(),
    attack: Number(attack) || 0,
  };

  cards.push(card);
  saveCards(cards);
  res.status(201).json(card);
});

app.use((req, res) => {
  res.status(404).send("<h1>404 - Página não encontrada</h1>");
});

app.listen(PORT, () => {
  console.log("http://localhost:3000");
});
