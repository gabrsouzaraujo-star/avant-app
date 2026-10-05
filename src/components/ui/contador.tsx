"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  valor: number;
  prefixo?: string;
  sufixo?: string;
  animar?: boolean;
};

const DURACAO_MS = 1400;

/**
 * Numero que conta ate o valor final quando entra na tela.
 *
 * O HTML do servidor ja traz o valor final: sem JavaScript, para buscadores e
 * para quem pediu "reduzir movimento", o numero aparece pronto. A contagem so
 * acontece se o numero ainda estiver fora da tela ao hidratar — nunca se ve
 * o valor final virar zero.
 */
export function Contador({
  valor,
  prefixo = "",
  sufixo = "",
  animar = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [atual, setAtual] = useState(valor);

  useEffect(() => {
    const elemento = ref.current;
    if (!animar || !elemento) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const caixa = elemento.getBoundingClientRect();
    if (caixa.top < window.innerHeight) return;

    let quadro = 0;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();

        const inicio = performance.now();
        const passo = (agora: number) => {
          const progresso = Math.min((agora - inicio) / DURACAO_MS, 1);
          const suavizado = 1 - Math.pow(1 - progresso, 3);
          setAtual(Math.round(valor * suavizado));
          if (progresso < 1) quadro = requestAnimationFrame(passo);
        };
        quadro = requestAnimationFrame(passo);
      },
      { threshold: 0.6 },
    );

    // Zera fora da tela; o usuario nao ve, e a contagem parte do zero.
    quadro = requestAnimationFrame(() => setAtual(0));
    observador.observe(elemento);

    return () => {
      observador.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, [valor, animar]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefixo}
      {atual}
      {sufixo}
    </span>
  );
}
