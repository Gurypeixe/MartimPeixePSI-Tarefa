import { useState } from 'react'
import './App.css'

const cards = [
  { name: "Dragão", type: "Criatura", attack: 7, defense: 5 },
  { name: "Mago", type: "Mago", attack: 4, defense: 6 },
  { name: "Cavaleiro", type: "Guerreiro", attack: 8, defense: 4 },
  { name: "Fénix", type: "Criatura", attack: 9, defense: 3 },
  { name: "Guardião", type: "Criatura", attack: 5, defense: 8 }
];

export default function App() {
  return (
    <div>
      <h1>A minha coleção</h1>
    </div>
  );
}
