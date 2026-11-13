import { useState } from "react";

function Card({ id, name, attack, type, onDelete }) {
  const [likes, setLikes] = useState(0);

  return (
    <li className="card" style={{ marginBottom: "0.5rem" }}>
      <b>{name}</b> ({type}) — ataque {attack}
      {attack >= 6 && <span> forte</span>}{" "}
      <button onClick={() => setLikes(likes + 1)}>
        ♥ {likes}
      </button>
      {onDelete && (
        <button
          onClick={() => onDelete(id)}
          style={{ marginLeft: "0.5rem", color: "red", cursor: "pointer" }}
        >
          Apagar
        </button>
      )}
    </li>
  );
}

export default Card;
