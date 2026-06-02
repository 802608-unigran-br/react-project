// Implemente useLocalStorage<T>(chave, valorInicial)
// ✓ useState com lazy initializer lendo localStorage
// ✓ Função de set que persiste ao mesmo tempo
// ✓ Suporte a setter funcional: setValor(prev => ...)
// ✓ Retorno 'as const' para tipagem correta

import { useState } from 'react';

export function useLocalStorage<T>(chave: string, valorInicial: T) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const salvo = localStorage.getItem(chave);
      return salvo ? (JSON.parse(salvo) as T) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  function setValorEPersistir(novoValor: T | ((prev: T) => T)) {
    const valorFinal =
      typeof novoValor === "function"
        ? (novoValor as (prev: T) => T)(valor)
        : novoValor;

    setValor(valorFinal);
    localStorage.setItem(chave, JSON.stringify(valorFinal));
  }

  return [valor, setValorEPersistir] as const;
}