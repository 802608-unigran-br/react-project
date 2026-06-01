// ── Interfaces de dados da API Rick and Morty ──────────────

export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Personagem {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  image: string;
  location: {
    name: string;
    url: string;
  };
  origin: {
    name: string;
    url: string;
  };
  episode: string[];
  created: string;
}

export interface RespostaAPI {
  info: ApiInfo;
  results: Personagem[];
}

// MISSÃO 0: Crie um tipo 'FiltroStatus' usando um union type
// com os valores "all", "alive", "dead" e "unknown"
export type FiltroStatus = "all" | "alive" | "dead" | "unknown";