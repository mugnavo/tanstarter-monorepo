import { expect, test } from "@playwright/test";

const LOCAL_APP_HOSTNAMES = new Set(["localhost", "127.0.0.1"]);

test.beforeEach(async ({ context }) => {
  await context.route("**/*", async (route) => {
    const { hostname } = new URL(route.request().url());

    if (LOCAL_APP_HOSTNAMES.has(hostname)) {
      await route.continue();
      return;
    }

    await route.abort("blockedbyclient");
  });
});

test("a logged-out visitor can reach the login form", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /minimal monorepo starter/i })).toBeVisible();
  await expect(page.getByText("You are not signed in.")).toBeVisible();

  await page.getByText("Just created a project from this template?").click();
  await expect(page.getByText(/The Playwright config needs no change/)).toBeVisible();

  await page.getByRole("button", { name: "Log in" }).click();

  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("heading", { name: /welcome back/i })).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
});
