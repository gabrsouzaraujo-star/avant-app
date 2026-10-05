import { expect, test } from "@playwright/test";
import { cases } from "../src/data/cases";
import { rotas } from "./rotas";

test("JSON-LD valido em todas as paginas", async ({ page }) => {
  for (const rota of rotas) {
    await page.goto(rota);
    const blocos = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(blocos.length, rota).toBeGreaterThan(0);

    for (const bloco of blocos) {
      expect(() => JSON.parse(bloco), rota).not.toThrow();
    }
  }
});

test("Organization traz o contato central", async ({ page }) => {
  await page.goto("/");
  const blocos = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const dados = blocos.flatMap((bloco) => [JSON.parse(bloco)].flat());
  const organizacao = dados.find((item) =>
    [item["@type"]].flat().includes("Organization"),
  );

  expect(organizacao).toBeTruthy();
  expect(organizacao.address.addressLocality).toBe("Curitiba");
  // Nada de nota, avaliacao ou contagem inventada no schema.
  expect(organizacao.aggregateRating).toBeUndefined();
});

test("Open Graph e Twitter em todas as paginas", async ({ page }) => {
  for (const rota of rotas) {
    await page.goto(rota);
    await expect(page.locator('meta[property="og:title"]'), rota).toHaveCount(
      1,
    );
    await expect(
      page.locator('meta[property="og:image"]').first(),
      rota,
    ).toHaveAttribute("content", /^https?:\/\//);
    await expect(
      page.locator('meta[name="twitter:card"]'),
      rota,
    ).toHaveAttribute("content", "summary_large_image");
  }
});

test("sitemap e robots", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const item of cases) {
    expect(sitemap).toContain(`/cases/${item.slug}`);
  }

  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap:");

  const og = await request.get("/opengraph-image");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toContain("image/png");
});
