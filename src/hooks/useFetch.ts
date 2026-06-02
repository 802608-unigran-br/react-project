// Implemente useFetch<T>(url: string) com:
// ✓ useState para dados, loading e erro
// ✓ useEffect com AbortController
// ✓ Verificação de res.ok antes de .json()
// ✓ try/catch/finally correto
// ✓ Cleanup: return () => controller.abort()

import { useState, useEffect } from 'react';

// <T> é genérico — funciona para qualquer formato de dado da API
export function useFetch<T>(url: string) {
  const [dados, setDados] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;
    
    const controller = new AbortController();

    async function buscar() {
      setLoading(true);
      setErro(null);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`);
        const json: T = await res.json();
        setDados(json);
      } catch (e) {
        if (e instanceof Error && e.name !== "AbortError") {
          setErro(e.message);
        }
      } finally {
        setLoading(false);
      }
    }

    buscar();


    return () => controller.abort();
  }, [url]);

  return { dados, loading, erro };
}