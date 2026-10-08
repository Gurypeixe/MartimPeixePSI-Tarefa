import { useState } from 'react';
import Card from './Components/Card';
import { cards } from './data/cards';

export default function App() {
  const [tipo, setTipo] = useState('todas');

  // Filtra de forma direta numa só linha
  const visiveis = cards.filter(c => tipo === 'todas' || c.type === tipo);

  return (
    <main>
      <h1>A minha coleção</h1>
      <p>Tenho {cards.length} cartas ({visiveis.length} à vista)</p>

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