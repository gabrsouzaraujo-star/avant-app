import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Poppins } from "next/font/google";
import {
  GtmHead,
  GtmNoscript,
  GtmPreconnect,
} from "@/components/analytics/gtm";
import { Cabecalho } from "@/components/layout/cabecalho";
import { Rodape } from "@/components/layout/rodape";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/data/site";
import { schemaOrganizacao, schemaWebsite } from "@/lib/seo";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// Serifada editorial complementar: so nos titulos estrategicos e numeros.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} | Consultoria de franquias`,
    template: `%s | ${site.nome}`,
  },
  description: site.descricao,
  applicationName: site.nome,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <GtmPreconnect />
        <GtmHead />
        {/*
         * Sem JavaScript, o conteudo animado por <Revelar> ficaria preso em
         * opacity 0. Esta regra o mostra direto.
         */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh">
        <GtmNoscript />
        <JsonLd dados={[schemaOrganizacao(), schemaWebsite()]} />
        <Cabecalho />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Rodape />
      </body>
    </html>
  );
}
