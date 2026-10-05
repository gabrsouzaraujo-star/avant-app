import { site } from "@/data/site";

/**
 * Google Tag Manager, com o snippet oficial inline.
 *
 * So e renderizado quando `site.analytics.gtmId` esta preenchido. Os eventos
 * de conversao (`src/lib/rastreamento.ts`) vao para o mesmo `dataLayer` que
 * este script inicializa.
 */
export function GtmHead() {
  const id = site.analytics.gtmId;
  if (!id) return null;

  return (
    // eslint-disable-next-line @next/next/next-script-for-ga -- snippet oficial inline no <head>, como pede a arquitetura do projeto; evita uma dependencia (@next/third-parties) so para isto.
    <script
      id="gtm"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`,
      }}
    />
  );
}

export function GtmNoscript() {
  const id = site.analytics.gtmId;
  if (!id) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${id}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}

/** Preconnect so faz sentido quando o GTM vai mesmo carregar. */
export function GtmPreconnect() {
  if (!site.analytics.gtmId) return null;
  return <link rel="preconnect" href="https://www.googletagmanager.com" />;
}
