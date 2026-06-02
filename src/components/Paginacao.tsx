import type { ApiInfo } from "../types/rickandmorty"

interface Props {
    info : ApiInfo;
    pagina : number;
    onPaginaChange : (func : React.SetStateAction<number>) => void;
}

export function Paginacao({info, pagina, onPaginaChange} : Props) {
    return <div className="paginacao">
        <span className="pag-info">
            {info.count} personagens · Página {pagina} de {info.pages}
        </span>
        <div className="pag-botoes">
            <button
                className="btn-pag"
                disabled={!info.prev}
                onClick={() => onPaginaChange(p => p - 1)}
            >
                ← Anterior
            </button>
            <button
                className={`btn-pag ${info.next ? 'proximo' : ''}`}
                disabled={!info.next}
                onClick={() => onPaginaChange(p => p + 1)}
            >
                Próxima →
            </button>
        </div>
    </div>
}