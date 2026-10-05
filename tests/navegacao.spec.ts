import { expect, test } from "@playwright/test";
import { navegacao } from "../src/data/site";
import { rotasFixas } from "./rotas";

test("nenhum link interno quebrado", async ({ page, request }) => {
  const encontrados = new Set<string>();

  for (const rota of rotasFixas) {
    await page.goto(rota);
    const hrefs = await page
      .locator('a[href^="/"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")!));
    hrefs.forEach((href) => encontrados.add(href.split("#")[0] || "/"));
  }

  for (const href of encontrados) {
    const resposta = await request.get(href);
    expect(resposta.status(), href).toBeLessThan(400);
  }
});

test("links externos abrem em nova aba com rel seguro", async ({ page }) => {
  for (const rota of rotasFixas) {
    await page.goto(rota);
    const externos = page.locator('a[href^="http"]');
    for (const link of await externos.all()) {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  }
});

test.describe("header", () => {
  test("navegacao principal no desktop", async ({ page, isMobile }) => {
    test.skip(isMobile, "no celular a navegacao fica no menu");
    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Principal" });
    for (const item of navegacao) {
      await expect(nav.getByRole("link", { name: item.rotulo })).toBeVisible();
    }

    await nav.getByRole("link", { name: "Cases" }).click();
    await expect(page).toHaveURL(/\/cases$/);
    await expect(nav.getByRole("link", { name: "Cases" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("header compacta ao rolar", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header").first();
    const alturaInicial = (await header.boundingBox())!.height;

    await page.mouse.wheel(0, 800);
    await expect
      .poll(async () => (await header.boundingBox())!.height)
      .toBeLessThan(alturaInicial);
  });

  test("menu mobile acessivel", async ({ page, isMobile }) => {
    test.skip(!isMobile, "so existe no celular");
    await page.goto("/");

    const botao = page.getByRole("button", { name: "Abrir menu" });
    await expect(botao).toHaveAttribute("aria-expanded", "false");
    await botao.click();

    const fechar = page.getByRole("button", { name: "Fechar menu" });
    await expect(fechar).toHaveAttribute("aria-expanded", "true");

    const menu = page.getByRole("navigation", { name: "Menu" });
    for (const item of navegacao) {
      await expect(menu.getByRole("link", { name: item.rotulo })).toBeVisible();
    }
    await expect(
      menu.getByRole("link", { name: /Analisar minha empresa/ }),
    ).toBeVisible();

    // Esc fecha e devolve o foco ao botao.
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(
      page.getByRole("button", { name: "Abrir menu" }),
    ).toBeFocused();

    // Navegar pelo menu fecha o menu.
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await menu.getByRole("link", { name: "Sobre" }).click();
    await expect(page).toHaveURL(/\/sobre$/);
    await expect(menu).toBeHidden();
  });

  test("link para pular ao conteudo", async ({ page, isMobile }) => {
    test.skip(isMobile, "teclado fisico");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const pular = page.getByRole("link", { name: "Pular para o conteúdo" });
    await expect(pular).toBeFocused();
    await expect(pular).toBeVisible();
  });
});

test("player do AvantCast so carrega o YouTube depois do clique", async ({
  page,
}) => {
  await page.goto("/conteudos/avantcast-wanderlei-silva-geber-rajar-don-kebab");
  await expect(page.locator("iframe")).toHaveCount(0);

  await page.getByRole("button", { name: /Assistir/ }).click();
  await expect(page.locator('iframe[src*="youtube-nocookie.com"]')).toHaveCount(
    1,
  );
});
