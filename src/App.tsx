import { useState, useEffect, useMemo } from 'react';
import CartaoPersonagem from './components/cartaopersonagem';
import type { Personagem, ApiInfo, RespostaAPI, FiltroStatus } from './types/rickandmorty';
import './App.css';
import { useFetch } from './hooks/useFetch';
import { useDebounce } from './hooks/useDebounce';
import { useFavoritos } from './contexts/FavoritosContext';
import { BarraBusca, BotoesStatus } from './components/BarraBusca';
import { Paginacao } from './components/Paginacao';

function App() {
  // ─── MISSÃO 4: Declare os estados com useState e TypeScript ─
  // Você precisará de:
  //   personagens: Personagem[]         (começa vazio)
  //   info: ApiInfo | null              (começa null)
  //   loading: boolean                  (começa false)
  //   erro: string | null               (começa null)
  //   pagina: number                    (começa em 1)
  //   busca: string                     (começa vazia)
  //   filtroStatus: FiltroStatus        (começa em "all")
  //   personagemSelecionado: Personagem | null  (para o extra)
  var [personagens, setPersonagens] = useState<Personagem[]>([]);

  var [pagina, setPagina] = useState(1);
  var [busca, setBusca] = useState("");
  var [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("all");

  const url = `https://rickandmortyapi.com/api/character?page=${pagina}` + (busca === "" ? "" : `&name=${busca}`) + (filtroStatus === "all" ? "" : `&status=${filtroStatus}`);

  var {dados, loading, erro} = useFetch<RespostaAPI>(url);

  //var [personagemSelecionado, setPersonagemSelecionado] = useState<Personagem | null>(null);

  // ─── MISSÃO 7: Filtro local por nome ────────────────────────
  // Filtre 'personagens' pelo 'busca' (case insensitive).
  // Use .filter() e .toLowerCase() + .includes()
  //const personagensFiltrados: Personagem[] = personagens.filter((p) => p.name.toLowerCase().includes(busca));

  const buscaDebounced = useDebounce(busca, 400);

  const personagensFiltrados = useMemo(
    () =>
      (dados?.results ?? []).filter(p =>
        p.name.toLowerCase().includes(buscaDebounced.toLowerCase())
      ),
    [dados, buscaDebounced]
  );

  const { totalFavoritos } = useFavoritos();

  function handleFiltroChange(novoFiltro: FiltroStatus) {
    setFiltroStatus(novoFiltro);
    setPagina(1);
    setBusca("");
  }

  // ─── MISSÃO 8: JSX do componente ────────────────────────────
  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Painel de Personagens</h1>
          <p className="subtitulo">Dados consumidos da Rick and Morty API</p>
        </div>
        {/* Exiba o contador: info?.count personagens */}
        {/* <div className="contador">
          {info ? `${info.count} personagens` : '—'}
        </div> */}

        {totalFavoritos > 0 && (
          <span className="badge-favoritos">❤️ {totalFavoritos}</span>
        )}
      </header>

      <div className="controles">
        {/* MISSÃO 8a: Input de busca controlado */}
        {/*
        <input
          type="text"
          className="campo-busca"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />

        <div className="filtros">
          {(['all', 'alive', 'dead', 'unknown'] as FiltroStatus[]).map((s) => (
            <button
              key={s}
              className={`btn-filtro ${filtroStatus === s ? 'ativo' : ''}`}
              onClick={() => {
                setFiltroStatus(s);
                setPagina(1); // resetar para página 1 ao mudar filtro
              }}
            >
              {s === 'all' ? 'Todos' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        */}
        <BarraBusca busca={busca} onBuscaChange={setBusca} />
        <BotoesStatus filtroAtivo={filtroStatus} onFiltroChange={handleFiltroChange} />
      </div>


      {/* Mensagens de status */}
      {loading && <p className="status loading">Carregando personagens...</p>}
      {erro && <p className="status erro">❌ {erro.toString()}</p>}

      {/* MISSÃO 8c: Renderize o grid com CartaoPersonagem */}
      {!loading && !erro && (
        <div className="grid">
          {personagensFiltrados.length > 0
            ? personagensFiltrados.map((p) => (
                <CartaoPersonagem
                  key={p.id}
                  personagem={p}
                />
              ))
            : <p className="vazio">Nenhum personagem encontrado.</p>
          }
        </div>
      )}

      {/* MISSÃO 8d: Paginação */}
      {dados?.info && !loading && (
        <Paginacao
          info={dados.info}
          pagina={pagina}
          onPaginaChange={setPagina}>
        </Paginacao>
      )}
    </div>
  );
}

export default App;