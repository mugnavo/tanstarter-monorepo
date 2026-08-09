# Workflow

## Commands

- `vpr build`: Only for build/bundler issues or verifying production output
- `vpr lint`: Covers both type-aware linting and type checking. No need to run `tsc --noEmit`
- `vpr dev` runs indefinitely in watch mode
- `vpr db` for Drizzle Kit commands (e.g. `vpr db generate` to generate a migration)

Don't build after every change. Use lint as the baseline and run the narrowest relevant tests described below.

## Testing

- `vp test`: Run fast Node-mode Vitest tests once
- `vp test watch`: Run Vitest in watch mode
- `vpr test:e2e`: Run the local Chromium end-to-end tests
- `vp exec playwright install chromium`: Install the E2E browser once per machine

Run the narrowest tests relevant to the changed behavior. Playwright remains separate from the default lint/check loop; use it whenever a change affects a covered browser journey. See [Testing](./testing.md) for test selection and design guidance.

## Formatting

Oxfmt (via Vite+) is configured for consistent code formatting via `vpr format`. It runs automatically on commit via Vite+ pre-commit hooks, so manual formatting is not necessary.
