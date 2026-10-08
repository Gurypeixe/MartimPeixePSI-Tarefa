import Card from './Components/Card';
import { cards } from './data/cards';

export default function App() {
  return (
    <main>
      <h1>A minha coleção</h1>
      <p>Tenho {cards.length} cartas</p>

      <ul>
        {cards.map((card) => (
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