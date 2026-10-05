import type { NextConfig } from "next";

/**
 * Todo o site e estatico (SSG): nenhuma pagina depende de Server Action, API
 * Route, banco ou cookie. Hospedagem na Vercel — por isso redirects e
 * headers ficam aqui, e nao em `_redirects`/`_headers`.
 */
const nextConfig: NextConfig = {
  images: {
    // Thumbnails dos episodios do AvantCast.
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },

  async redirects() {
    return [
      // Rotas da v1 deste projeto.
      {
        source: "/franquias/:slug",
        destination: "/cases/:slug",
        permanent: true,
      },
      { source: "/franquias", destination: "/cases", permanent: true },
      { source: "/avantcast", destination: "/conteudos", permanent: true },
      // Rotas do site antigo em WordPress.
      {
        source: "/servicos-especializados",
        destination: "/servicos",
        permanent: true,
      },
      { source: "/quem-somos", destination: "/sobre", permanent: true },
      { source: "/fale-conosco", destination: "/contato", permanent: true },
      { source: "/blog", destination: "/conteudos", permanent: true },
      { source: "/blog/:caminho*", destination: "/conteudos", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:caminho*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Midia versionada no repositorio: nome muda quando o arquivo muda.
        source: "/:pasta(imagens|videos)/:arquivo*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
