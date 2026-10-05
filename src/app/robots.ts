import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * Indexacao so no dominio de producao. Previews da Vercel (`*.vercel.app`)
 * ficam fora do Google para nao competir com o site oficial.
 */
export default function robots(): MetadataRoute.Robots {
  const producao = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : true;

  return {
    rules: producao
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
