import { useState } from "react";

function Card({ name, attack, type }) {
  const [likes, setLikes] = useState(0);

  return (
    <li className="card">
      <b>{name}</b> ({type}) — ataque {attack}
      {attack >= 6 && <span> forte</span>}
      <button onClick={() => setLikes(likes + 1)}>
        ♥ {likes}
      </button>
    </li>
  );
}

export default Card;