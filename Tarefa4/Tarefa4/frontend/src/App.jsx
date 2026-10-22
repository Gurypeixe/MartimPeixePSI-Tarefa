import { useState, useEffect } from "react";
import Card from "./Components/Card";

const APIURL = "http://localhost:3000";

export default function App() {
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [cards, setCards] = useState([]);
  const [sorte, setSorte] = useState(null);

  useEffect(() => {
    async function getCards() {
      const response = await fetch(`${APIURL}/api/cartas`);
      const data = await response.json();
      setCards(data);
    }
    getCards();
  }, []);

  const sortearCarta = () => {
    if (cards.length === 0) return;
    const random = Math.floor(Math.random() * cards.length);
    setSorte(cards[random]);
  };

  const visible = cards.filter(
    (card) =>
      (filter === "Todas" || card.type === filter) &&
      card.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <h1>A minha coleção</h1>
      <p>Tenho {cards.length} cartas ({visible.length} à vista)</p>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={sortearCarta}>Carta à sorte</button>
        {sorte && (
          <p>
            Carta calhada: <b>{sorte.name}</b> (Ataque: {sorte.attack})
          </p>
        )}
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Pesquisar..."
      />

      <div>
        <button onClick={() => setFilter("Todas")}>Todas</button>
        <button onClick={() => setFilter("Criatura")}>Só criaturas</button>
        <button onClick={() => setFilter("Feitiço")}>Só feitiços</button>
      </div>

      {/* Renderização com .map() e key */}
      <ul>
        {visible.map((card) => (
          <Card
            key={card.id ?? card.name}
            name={card.name}
            attack={card.attack}
            type={card.type}
          />
        ))}
      </ul>
    </main>
  );
}