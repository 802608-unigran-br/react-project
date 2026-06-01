import { useState, useEffect } from 'react';
import CartaoPersonagem from './components/cartaopersonagem';
import type { Personagem, ApiInfo, RespostaAPI, FiltroStatus } from './types/rickandmorty';
import './App.css';

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
  var [info, setInfo] = useState<ApiInfo | null>(null);
  var [loading, setLoading] = useState(false);
  var [erro, setErro] = useState<string | null>(null);
  var [pagina, setPagina] = useState(1);
  var [busca, setBusca] = useState("");
  var [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("all");
  //var [personagemSelecionado, setPersonagemSelecionado] = useState<Personagem | null>(null);

  // ─── MISSÃO 5: useEffect ────────────────────────────────────
  // Busque os personagens quando 'pagina' ou 'filtroStatus' mudar.
  // Use [pagina, filtroStatus] como array de dependências.
  useEffect(() => {
    buscarPersonagens();
  }, [pagina, filtroStatus]);


  // ─── MISSÃO 6: Função de busca assíncrona ───────────────────
  // URL: https://rickandmortyapi.com/api/character
  // Parâmetros: ?page={pagina}&status={filtroStatus}
  // (quando filtroStatus é "all", não inclua o parâmetro status)
  async function buscarPersonagens(): Promise<void> {
    setLoading(true);
    setErro(null);

    const url = `https://rickandmortyapi.com/api/character?page=${pagina}` + filtroStatus === "All" && `&status=${filtroStatus}`;

    // nota: prefiro usar .then()
    try {
      fetch(url).then(
        resp => {
          resp.json().then(
            json => {
              setInfo(json.info);

              var tempPersonagens : Personagem[] = [];
              json.results.foreach(e => {
                tempPersonagens.push({
                  id: e.id,
                  name: e.name,
                  status: e.status,
                  species: e.species,
                  image: e.image,
                  location: e.location,
                  origin: e.origin,
                  episode: e.episode,
                  created: e.created
                });
              });

              setPersonagens(tempPersonagens);
            },
            jsonerr => {
              setErro(jsonerr);
            }
          )
        },
        err => {
          setErro(err);
        }
      );
    } catch(msg) {
      setErro(msg);
    } finally {
      setLoading(false);
    }
    

    // 1. setLoading(true), setErro(null)
    // 2. construa a URL com template literal
    // 3. await fetch → verifique .ok → await .json()
    // 4. atualize personagens e info
    // 5. catch → setErro(mensagem)
    // 6. finally → setLoading(false)
  }

  // ─── MISSÃO 7: Filtro local por nome ────────────────────────
  // Filtre 'personagens' pelo 'busca' (case insensitive).
  // Use .filter() e .toLowerCase() + .includes()
  const personagensFiltrados: Personagem[] = personagens.filter((p) => p.name.toLowerCase().includes(busca));

  // ─── MISSÃO 8: JSX do componente ────────────────────────────
  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>🧬 Painel de Personagens</h1>
          <p className="subtitulo">Dados consumidos da Rick and Morty API</p>
        </div>
        {/* Exiba o contador: info?.count personagens */}
        <div className="contador">
          {info ? `${info.count} personagens` : '—'}
        </div>
      </header>

      <div className="controles">
        {/* MISSÃO 8a: Input de busca controlado */}
        <input
          type="text"
          className="campo-busca"
          placeholder="🔍 Buscar por nome..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />

        {/* MISSÃO 8b: Botões de filtro de status */}
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
      </div>

      {/* Mensagens de status */}
      {loading && <p className="status loading">⏳ Carregando personagens...</p>}
      {erro && <p className="status erro">❌ {erro}</p>}

      {/* MISSÃO 8c: Renderize o grid com CartaoPersonagem */}
      {!loading && !erro && (
        <div className="grid">
          {personagensFiltrados.length > 0
            ? personagensFiltrados.map((p) => (
                <CartaoPersonagem
                  key={p.id}
                  personagem={p}
                  onClick={() => {/* extra: setPersonagemSelecionado(p) */}}
                />
              ))
            : <p className="vazio">Nenhum personagem encontrado.</p>
          }
        </div>
      )}

      {/* MISSÃO 8d: Paginação */}
      {info && !loading && (
        <div className="paginacao">
          <span className="pag-info">
            {info.count} personagens · Página {pagina} de {info.pages}
          </span>
          <div className="pag-botoes">
            <button
              className="btn-pag"
              disabled={!info.prev}
              onClick={() => setPagina(p => p - 1)}
            >
              ← Anterior
            </button>
            <button
              className={`btn-pag ${info.next ? 'proximo' : ''}`}
              disabled={!info.next}
              onClick={() => setPagina(p => p + 1)}
            >
              Próxima →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;