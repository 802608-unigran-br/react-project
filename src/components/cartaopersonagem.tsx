import { memo } from 'react';
import type { Personagem } from '../types/rickandmorty';
import { useFavoritos } from '../contexts/FavoritosContext';

// MISSÃO 1: Defina a interface de Props para este componente.
// O componente deve receber um objeto 'personagem: Personagem'
// e opcionalmente uma função 'onClick?: () => void'
// interface Props {
//     personagem : Personagem
//     onClick? : () => void;
//   // complete aqui
// }

// Atualize CartaoPersonagem para:
// ✓ Usar React.memo
// ✓ Usar useFavoritos() — sem prop onFavoritar!
// ✓ Botão ❤️/🤍 que chama toggleFavorito(id)
// ✓ Borda/destaque visual quando for favorito

const CartaoPersonagem = memo(function CartaoPersonagem({personagem}: { personagem: Personagem }) {
  // MISSÃO 2: Implemente a lógica para a classe CSS do badge.
  // status "Alive"   → classe "badge-alive"
  // status "Dead"    → classe "badge-dead"
  // status "unknown" → classe "badge-unknown"

  const { toggleFavorito, isFavorito } = useFavoritos();
  const favoritado = isFavorito(personagem.id);

  const classeBadge = `badge-${personagem.status.toLowerCase()}`

  return (
    <div className={`card ${favoritado ? "card-fav" : ""}`}>
      <img
        src={personagem.image}
        alt={personagem.name}
        className="card-img"
      />
      <div className="card-body">
        
        <div className="card-nome">{personagem.name}</div>
        <div className="card-especie">{personagem.species}</div>

        <span className={`badge ${classeBadge}`}>{personagem.status.charAt(0).toUpperCase() + personagem.status.slice(1)}</span>

        <button
          className={"btn-fav"}
          onClick={() => toggleFavorito(personagem.id)}
          aria-label={favoritado ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {favoritado ? "❤️" : "🤍"}
        </button>

        {/* MISSÃO 3: Complete o JSX do card
            - Exiba personagem.name com a classe "card-nome"
            - Exiba personagem.species com a classe "card-especie"
            - Exiba um <span> com o badge de status
        */}
      </div>
    </div>
  );
});

export default CartaoPersonagem;