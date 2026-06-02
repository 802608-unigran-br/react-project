import type { Personagem } from '../types/rickandmorty';

// MISSÃO 1: Defina a interface de Props para este componente.
// O componente deve receber um objeto 'personagem: Personagem'
// e opcionalmente uma função 'onClick?: () => void'
interface Props {
    personagem : Personagem
    onClick? : () => void;
  // complete aqui
}

function CartaoPersonagem({ personagem, onClick }: Props) {
  // MISSÃO 2: Implemente a lógica para a classe CSS do badge.
  // status "Alive"   → classe "badge-alive"
  // status "Dead"    → classe "badge-dead"
  // status "unknown" → classe "badge-unknown"
  var classeBadge = "";
  switch(personagem.status) {
    case "Alive":
        classeBadge = "badge-alive";
        break; 
    case "Dead":
        classeBadge = "badge-dead";
        break; 
    case "unknown":
        classeBadge = "badge-unknown";
        break;
  }

  return (
    <div className="card" onClick={onClick}>
      <img
        src={personagem.image}
        alt={personagem.name}
        className="card-img"
      />
      <div className="card-body">
        
        <div className="card-nome">{personagem.name}</div>
        <div className="card-especie">{personagem.species}</div>

        <span className={`badge badge-${personagem.status.toLowerCase()}`}>{personagem.status.charAt(0).toUpperCase() + personagem.status.slice(1)}</span>

        {/* MISSÃO 3: Complete o JSX do card
            - Exiba personagem.name com a classe "card-nome"
            - Exiba personagem.species com a classe "card-especie"
            - Exiba um <span> com o badge de status
        */}
      </div>
    </div>
  );
}

export default CartaoPersonagem;