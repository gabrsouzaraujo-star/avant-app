import { expect, test } from "@playwright/test";

/** Larguras exigidas no briefing — do celular pequeno ao monitor grande. */
const larguras = [320, 375, 390, 414, 768, 1024, 1280, 1440, 1920];
const paginas = [
  "/",
  "/cases/medinfuse",
  "/diagnostico",
  "/contato",
  "/conteudos",
];

for (const largura of larguras) {
  test(`sem overflow horizontal em ${largura}px`, async ({ page }) => {
    await page.setViewportSize({ width: largura, height: 900 });

    for (const pagina of paginas) {
      await page.goto(pagina);
      const excesso = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(excesso, `${pagina} em ${largura}px`).toBeLessThanOrEqual(0);
    }
  });
}

test("alvos de toque dos CTAs com pelo menos 44px no celular", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const ctas = page.locator('a[href*="wa.me"]:visible');
  for (const cta of await ctas.all()) {
    const caixa = await cta.boundingBox();
    if (caixa) expect(caixa.height).toBeGreaterThanOrEqual(44);
  }
});
