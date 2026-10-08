import { useState } from "react";
import Card from "./Components/Card";
import { cards } from "./data/cards";

export default function App() {
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");

  const visible = cards.filter(
    (card) =>
      (filter === "Todas" || card.type === filter) &&
      card.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <h1>A minha coleção</h1>
      <p>Tenho {cards.length} cartas ({visible.length} à vista)</p>

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
            key={card.id}
            name={card.name}
            attack={card.attack}
            type={card.type}
          />
        ))}
      </ul>
    </main>
  );
}