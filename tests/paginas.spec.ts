import { expect, test } from "@playwright/test";
import { rotas } from "./rotas";

/**
 * Toda pagina publica: responde 200, tem exatamente um h1, title e
 * canonical, nao loga erro no console e nao tem imagem quebrada.
 */
for (const rota of rotas) {
  test(`pagina ${rota}`, async ({ page }) => {
    const erros: string[] = [];
    page.on("console", (mensagem) => {
      if (mensagem.type() === "error") erros.push(mensagem.text());
    });
    page.on("pageerror", (erro) => erros.push(String(erro)));

    const resposta = await page.goto(rota);
    expect(resposta?.status()).toBe(200);

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/AVANT/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /^https?:\/\//,
    );

    // Rola ate o fim para disparar lazy loading e as animacoes de entrada.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 40));
      }
    });
    await page.waitForLoadState("networkidle");

    const quebradas = await page.evaluate(() =>
      [...document.images]
        .filter((imagem) => imagem.complete && imagem.naturalWidth === 0)
        .map((imagem) => imagem.currentSrc || imagem.src),
    );
    expect(quebradas, "imagens quebradas").toEqual([]);

    const semAlt = await page.locator("img:not([alt])").count();
    expect(semAlt, "imagens sem atributo alt").toBe(0);

    expect(erros, "erros no console").toEqual([]);
  });
}

test("404 para rota inexistente", async ({ page }) => {
  const resposta = await page.goto("/rota-que-nao-existe");
  expect(resposta?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("não existe");
});

test("rotas antigas redirecionam", async ({ page }) => {
  await page.goto("/franquias/cao-veio");
  await expect(page).toHaveURL(/\/cases\/cao-veio$/);

  await page.goto("/avantcast");
  await expect(page).toHaveURL(/\/conteudos$/);
});
