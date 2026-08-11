import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  outputDir: "../../.cache/playwright/web",
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "vp run build && node .output/server/index.mjs",
    env: {
      NODE_ENV: "production",
      PORT: String(PORT),
    },
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
