interface BarraBuscaProps {
  busca: string;
  onBuscaChange: (valor: string) => void;
}

interface BotoesStatusProps {
  filtroAtivo: string;
  onFiltroChange: (status: string) => void;
}

export function BarraBusca({ busca, onBuscaChange }: BarraBuscaProps) {
  return (
    <input
      type="text"
      value={busca}
      onChange={(e) => onBuscaChange(e.target.value)}
      placeholder="🔍 Buscar por nome..."
      className="campo-busca"
    />
  );
}

export function BotoesStatus({ filtroAtivo, onFiltroChange }: BotoesStatusProps) {
  const opcoes = ["all", "alive", "dead", "unknown"] as const;
  return (
    <div className="filtros">
      {opcoes.map((op) => (
        <button
          key={op}
          className={`btn-filtro ${filtroAtivo === op ? "ativo" : ""}`}
          onClick={() => onFiltroChange(op)}
        >
          {op === "all" ? "Todos" : op.charAt(0).toUpperCase() + op.slice(1)}
        </button>
      ))}
    </div>
  );
}