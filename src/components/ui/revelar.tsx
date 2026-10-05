"use client";

import { domAnimation, LazyMotion, m, MotionConfig } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Atraso em segundos — para escalonar itens irmaos. */
  atraso?: number;
  as?: "div" | "li";
};

/**
 * Revela o conteudo ao entrar na tela: sobe 24px e aparece, uma unica vez.
 *
 * - `LazyMotion` + `m` carregam so o pacote de animacao de DOM, nao o
 *   framer-motion inteiro.
 * - `reducedMotion="user"` respeita o "reduzir movimento" do sistema: o
 *   conteudo aparece direto, sem deslocamento.
 */
export function Revelar({
  children,
  className,
  atraso = 0,
  as = "div",
}: Props) {
  const Componente = as === "li" ? m.li : m.div;

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Componente
          className={className}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{
            duration: 0.7,
            delay: atraso,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {children}
        </Componente>
      </MotionConfig>
    </LazyMotion>
  );
}
