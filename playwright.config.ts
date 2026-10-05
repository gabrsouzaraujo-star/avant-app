import { defineConfig, devices } from "@playwright/test";

/**
 * Testes de ponta a ponta contra o build de producao (`next start`), que e o
 * que a Vercel serve — o dev server tem overlay, HMR e avisos que nao
 * existem em producao.
 *
 * Porta 3100 para nao brigar com o `npm run dev` na 3000.
 */
const PORTA = 3100;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORTA}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
      // O menu mobile e a regua de larguras so precisam rodar uma vez.
      testIgnore: /larguras|seo/,
    },
  ],
  webServer: {
    command: `npm run build && npm run start -- -p ${PORTA}`,
    url: `http://localhost:${PORTA}`,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
