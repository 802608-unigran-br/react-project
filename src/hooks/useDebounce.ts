// Implemente useDebounce<T>(valor: T, delay = 400): T
// ✓ useState para o valor atrasado
// ✓ useEffect com setTimeout
// ✓ Cleanup correto (return () => clearTimeout(timer))

import { useEffect, useState } from "react";

export function useDebounce<T>(valor: T, delay: number = 400): T {
  // MISSÃO: implemente aqui
  const [valorDebounced, setValorDebounced] = useState<T>(valor);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setValorDebounced(valor);
    }, delay);

    return () => clearTimeout(timer);
  }, [valor, delay]);

  return valorDebounced;
}