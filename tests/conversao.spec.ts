import { expect, test } from "@playwright/test";
import { site } from "../src/data/site";
import { mensagensWhatsapp } from "../src/lib/contato";
import { rotasFixas } from "./rotas";

const prefixoWhatsapp = `https://wa.me/${site.contato.whatsapp}?text=`;

test.describe("WhatsApp", () => {
  for (const rota of rotasFixas) {
    test(`todo link de WhatsApp em ${rota} usa o numero central`, async ({
      page,
    }) => {
      await page.goto(rota);

      const links = await page
        .locator('a[href*="wa.me"], a[href*="whatsapp.com"]')
        .evaluateAll((elementos) =>
          elementos.map((elemento) => elemento.getAttribute("href") ?? ""),
        );

      for (const href of links) {
        expect(href.startsWith(prefixoWhatsapp), href).toBe(true);
        const texto = new URL(href).searchParams.get("text") ?? "";
        expect(texto).toMatch(/^Olá! Vim pelo site da Avant/);
      }
    });
  }

  test("CTA do hero leva a mensagem do hero", async ({ page }) => {
    await page.goto("/");
    const cta = page
      .locator("#hero-titulo")
      .locator("xpath=ancestor::section")
      .getByRole("link", { name: /Quero analisar minha empresa/ });

    const href = await cta.getAttribute("href");
    const texto = new URL(href!).searchParams.get("text");
    expect(texto).toBe(mensagensWhatsapp.hero);
    await expect(cta).toHaveAttribute("target", "_blank");
    await expect(cta).toHaveAttribute("rel", /noopener/);
  });

  test("clique registra evento no dataLayer", async ({ page, context }) => {
    // Impede que a nova aba realmente abra o WhatsApp.
    await context.route(/wa\.me/, (rota) => rota.abort());
    await page.goto("/");

    await page
      .locator("#hero-titulo")
      .locator("xpath=ancestor::section")
      .getByRole("link", { name: /Quero analisar minha empresa/ })
      .click({ modifiers: [] });

    const eventos = await page.evaluate(() =>
      (window.dataLayer ?? []).map((item) => item.event),
    );
    expect(eventos).toContain("whatsapp_click");
    expect(eventos).toContain("hero_cta");
  });

  test("autoavaliacao leva os pontos marcados na mensagem", async ({
    page,
  }) => {
    await page.goto("/diagnostico");

    await page.getByText("Replicabilidade", { exact: true }).click();
    await page.getByText("Margem", { exact: true }).click();
    await expect(
      page.getByText("pontos marcados", { exact: true }),
    ).toBeVisible();

    const href = await page
      .locator("aside")
      .getByRole("link", { name: /pode virar franquia/ })
      .getAttribute("href");
    const texto = new URL(href!).searchParams.get("text") ?? "";

    expect(texto).toContain(mensagensWhatsapp.diagnostico);
    expect(texto).toContain("replicabilidade, margem");
  });
});
