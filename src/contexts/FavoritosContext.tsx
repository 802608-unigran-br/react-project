// Crie o contexto com:
// ✓ Interface FavoritosContextType:
//     favoritos: number[]
//     toggleFavorito: (id: number) => void
//     isFavorito: (id: number) => boolean
//     totalFavoritos: number
// ✓ createContext + FavoritosProvider com useLocalStorage
// ✓ Hook useFavoritos com validação (throw se fora do Provider)

import { createContext, useContext, useState, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// ─── 1. Tipo do contexto ──────────────────────────────────
interface FavoritosContextType {
  favoritos: number[];
  toggleFavorito: (id: number) => void;
  isFavorito: (id: number) => boolean;
  totalFavoritos: number;
}

const FavoritosContext = createContext<FavoritosContextType>(
  null as unknown as FavoritosContextType
);

export function FavoritosProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useLocalStorage<number[]>(
    "personagens-favoritos",
    []
  );

  function toggleFavorito(id: number) {
    setFavoritos(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }

  const isFavorito = (id: number): boolean => favoritos.includes(id);

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        toggleFavorito,
        isFavorito,
        totalFavoritos: favoritos.length,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}


export function useFavoritos(): FavoritosContextType {
  const ctx = useContext(FavoritosContext);
  if (!ctx) {
    throw new Error("useFavoritos deve ser usado dentro de FavoritosProvider");
  }
  return ctx;
}