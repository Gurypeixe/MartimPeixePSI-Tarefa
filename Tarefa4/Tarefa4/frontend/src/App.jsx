import { useState, useEffect } from "react";
import Card from "./Components/Card";

const APIURL = "http://localhost:3000";

export default function App() {
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sorte, setSorte] = useState(null);

  useEffect(() => {
    fetch(`${APIURL}/api/cartas`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCards(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
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

      {loading && <p>A carregar...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
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
        </>
      )}
    </main>
  );
}