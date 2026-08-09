import { expect, test } from "@playwright/test";

const NON_LOCAL_HTTP_URL = /^https?:\/\/(?!(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?(?:[/?#]|$))/;

test.beforeEach(async ({ context }) => {
  /**
   * Leave local Vite module requests untouched so dependency optimization can settle normally.
   * Vite 8.1 introduces experimental bundled dev mode, which may improve dev-server stability
   * for E2E tests. We should consider adopting it once the feature is stable.
   *
   * @see https://vite.dev/blog/announcing-vite8-1#experimental-bundled-dev-mode
   * @see https://github.com/vitejs/vite/discussions/22746
   */
  await context.route(NON_LOCAL_HTTP_URL, (route) => route.abort("blockedbyclient"));
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
