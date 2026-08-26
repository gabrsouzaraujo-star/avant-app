"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Acompanha uma media query sem sincronizar estado na mao.
 *
 * No servidor devolve `false`: e o valor seguro para "reduzir movimento" e
 * para os arranjos de tela, que so importam depois da hidratacao.
 */
export function useMediaQuery(consulta: string) {
  const inscrever = useCallback(
    (avisar: () => void) => {
      const mq = window.matchMedia(consulta);
      mq.addEventListener("change", avisar);
      return () => mq.removeEventListener("change", avisar);
    },
    [consulta],
  );

  return useSyncExternalStore(
    inscrever,
    () => window.matchMedia(consulta).matches,
    () => false,
  );
}
