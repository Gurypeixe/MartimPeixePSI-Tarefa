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

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [attack, setAttack] = useState("");
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    fetch(`${APIURL}/api/cartas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, type, attack: Number(attack) || 0 }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((savedCard) => {
        setCards((prev) => [...prev, savedCard]);
        setName("");
        setType("");
        setAttack("");
        setFormError(null);
      })
      .catch((err) => {
        setFormError(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleDelete = (id) => {
    fetch(`${APIURL}/api/cartas/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        setCards((prev) => prev.filter((card) => card.id !== id));
      })
      .catch((err) => {
        console.error("Erro ao apagar:", err);
      });
  };

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

          <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="Nome da carta"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Selecione o tipo</option>
              <option value="Criatura">Criatura</option>
              <option value="Feitiço">Feitiço</option>
              <option value="Mago">Mago</option>
              <option value="Guerreiro">Guerreiro</option>
            </select>
            <input
              type="number"
              placeholder="Ataque"
              value={attack}
              onChange={(e) => setAttack(e.target.value)}
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "A enviar..." : "Adicionar carta"}
            </button>
          </form>

          {formError && (
            <p style={{ color: "red", fontWeight: "bold" }}>{formError}</p>
          )}

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
                id={card.id}
                name={card.name}
                attack={card.attack}
                type={card.type}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
