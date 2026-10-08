import { useState } from 'react';
import Card from './Components/Card';
import { cards } from './Data/cards';

export default function App() {
  const [tipo, setTipo] = useState('todas');
  const [search, setSearch] = useState('');
  const [sorte, setSorte] = useState(null);

  const sortearCarta = () => {
    const random = Math.floor(Math.random() * cards.length);
    setSorte(cards[random]);
  };

  const visiveis = cards.filter((c) => {
    const bateTipo = tipo === 'todas' || c.type === tipo;
    const bateNome = c.name.toLowerCase().includes(search.toLowerCase());
    return bateTipo && bateNome;
  });

  return (
    <main>
      <h1>A minha coleção</h1>
      <p>Tenho {cards.length} cartas ({visiveis.length} à vista)</p>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={sortearCarta}>Carta à sorte</button>
        {sorte && <p>Carta calhada: <b>{sorte.name}</b> (Ataque: {sorte.attack})</p>}
      </div>

      <input
        type="text"
        placeholder="Pesquisar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        <button onClick={() => setTipo('todas')}>Todas</button>
        <button onClick={() => setTipo('Criatura')}>Só criaturas</button>
        <button onClick={() => setTipo('Feitiço')}>Só feitiços</button>
      </div>

      <ul>
        {visiveis.map((card) => (
          <Card key={card.id} name={card.name} attack={card.attack} type={card.type} />
        ))}
      </ul>
    </main>
  );
}