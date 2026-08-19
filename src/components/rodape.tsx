export function Rodape() {
  return (
    <footer
      id="contato"
      className="border-border border-t px-6 py-12 text-center"
    >
      <p className="text-sm font-bold tracking-[0.2em] uppercase">
        Avant Franchising
      </p>
      <p className="text-muted mt-2 text-xs">
        Transformando marcas em redes de franquias desde 2010.
      </p>
      <p className="text-muted mt-6 text-xs">
        © {new Date().getFullYear()} AVANT FRANCHISING
      </p>
    </footer>
  );
}
