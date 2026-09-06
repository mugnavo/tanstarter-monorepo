# [TanStarter Monorepo](https://github.com/mugnavo/tanstarter-monorepo)

<!-- scaffold:description -->

A minimal monorepo starter for 🏝️ TanStack Start, based on [mugnavo/tanstarter](https://github.com/mugnavo/tanstarter).

```
pnpm create mugnavo -t monorepo
```

- [React](https://react.dev) + TanStack [Start](https://tanstack.com/start/latest) + [Router](https://tanstack.com/router/latest) + [Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) + [Base UI](https://base-ui.com/) (base-rhea, [`--preset b1au68YWO`](https://ui.shadcn.com/create?preset=b1au68YWO&base=base&template=start&pointer=true))
- [Drizzle ORM](https://orm.drizzle.team/) + PostgreSQL
- [Better Auth](https://better-auth.com/)
- [Vite Plus](https://viteplus.dev/) + [Nitro](https://nitro.build/)

```sh
├── apps
│    ├── web                    # TanStack Start web app
├── packages
│    ├── auth                   # Better Auth
│    ├── db                     # Drizzle ORM + Drizzle Kit + PostgreSQL
│    └── ui                     # shadcn/ui primitives & utils
├── tools
│    └── tsconfig               # Shared TypeScript configuration
├── pnpm-workspace.yaml
├── README.md
└── vite.config.ts
```

## Getting Started

#### Prerequisites

- [Node.js](https://nodejs.org/en/download) >= 24
- [pnpm](https://pnpm.io/installation) >= 12
- [Vite Plus](https://viteplus.dev/guide/#install-vp) (`vp`)

#### Setup

1. [Use this template](https://github.com/new?template_name=tanstarter-monorepo&template_owner=mugnavo) or create a project using our CLI:

   ```
   pnpm create mugnavo -t monorepo
   ```

2. Create a `.env.local` file in `apps/web/` with your values, based on [`.env.schema`](./apps/web/.env.schema), then validate them:

   ```sh
   vpr env:load
   ```

3. Generate the initial migration with drizzle-kit, then apply to your database:

   ```sh
   vpr db generate
   vpr db migrate
   ```

   https://orm.drizzle.team/docs/migrations

4. Run the development server:

   ```sh
   vpr dev
   ```

   The development server should now be running at [http://localhost:3000](http://localhost:3000).

> [!TIP]
> If you want to run a local Postgres instance via Docker Compose with the dev server, you can use the [dev.sh](./dev.sh) script:
>
> ```sh
> ./dev.sh # runs "vp run --recursive --parallel dev"
> # or
> ./dev.sh web # runs "vp run --filter=@repo/web dev"
> ```

## Environment variables

[Varlock](https://varlock.dev/) keeps the environment-variable contract in `apps/web/.env.schema` and generates types from it. Put local values, including secrets, in the uncommitted `apps/web/.env.local`, then run `vpr env:load` to validate them.

In application code, `import { ENV } from "varlock/env"` instead of reading `process.env` directly.

When adding another runnable app (e.g. a separate Hono server), provide it with its own schema and local env file. Keep environment ownership with the runnable app rather than its shared packages.

## Deploying to production

The [vite config](./apps/web/vite.config.ts) is configured to use Nitro by default, which supports many [deployment presets](https://nitro.build/deploy) like Netlify, Vercel, Node.js, and more.

Refer to the [TanStack Start hosting docs](https://tanstack.com/start/latest/docs/framework/react/guide/hosting) for more information.

### Build caching

Vite+ has support for [caching](https://viteplus.dev/guide/cache) via Vite Task. A `build` task is configured in [`apps/web/vite.config.ts`](./apps/web/vite.config.ts) that can enable faster builds via caching. When deploying, use `vp run build` as the build command.

## Issue watchlist

- [Router/Start issues](https://github.com/TanStack/router/issues) - TanStack Start is in RC.
- [Devtools releases](https://github.com/TanStack/devtools/releases) - TanStack Devtools is in alpha and may still have breaking changes.
- [Nitro v3 beta](https://nitro.build/blog/v3-beta) - The template is configured with Nitro v3 beta by default.
- [Drizzle ORM v1 RC](https://orm.drizzle.team/docs/relations-v1-v2) - Drizzle ORM v1 is in RC with relations v2.
- [Vite+ releases](https://github.com/voidzero-dev/vite-plus/releases) - Vite+ is in beta.

## Goodies

#### Upgrading dependencies

Dependency versions are pinned, so they may be slightly outdated when you create your project. To selectively upgrade packages, run `vpr deps` or `vpx taze@latest -Ilwr --maturity-period 3`.

#### Scripts

Check the root [package.json](./package.json) and each workspace package's `package.json` for the full list of available scripts.

- **`auth:generate`** - Regenerate the [auth db schema](./packages/db/src/schema/auth.schema.ts) if you've made changes to your Better Auth [config](./packages/auth/src/auth.ts).
- **`ui`** - The shadcn/ui CLI. (e.g. `vpr ui add button`)
- **`format`**, **`lint`** - Run Oxfmt and Oxlint, or both via `vpr check`.
- **`deps`** - Selectively upgrade dependencies via taze.

#### Utilities

- [`/auth/src/tanstack/middleware.ts`](./packages/auth/src/tanstack/middleware.ts) - Sample middleware for enforcing authentication on server functions & API routes.
- [`/web/src/components/theme-toggle.tsx`](./apps/web/src/components/theme-toggle.tsx), [`/ui/lib/theme-provider.tsx`](./packages/ui/lib/theme-provider.tsx) - A theme toggle and provider for toggling between light and dark mode.

#### Testing

The [testing foundation](./.agents/testing.md) uses Vitest and Playwright and is intentionally lightweight. For short-lived prototypes, it can be safely ignored or removed.

- `vpr test` (or Vite+'s built-in `vp test`) runs the Vitest unit and local integration tests once.
- `vpr test watch` runs Vitest in watch mode.
- `vpr test:e2e` builds the app and runs the Playwright end-to-end tests.

## License

Code in this template is public domain via [Unlicense](./LICENSE). Feel free to remove or replace for your own project.

## Ecosystem

- [@tanstack/intent](https://tanstack.com/intent/latest/docs/getting-started/quick-start-consumers) - Up-to-date skills for your AI agents, auto-synchronized from your installed dependencies.
- [awesome-tanstack-start](https://github.com/Balastrong/awesome-tanstack-start) - A curated list of awesome resources for TanStack Start.
- [shadcn/ui Directory](https://ui.shadcn.com/docs/directory), [shoogle.dev](https://shoogle.dev/) - Component directories & registries for shadcn/ui.

## Related templates

- [mugnavo/tanstarter](https://github.com/mugnavo/tanstarter) - The original minimal version that this template is based on.
- [tsu-moe/tsu-stack](https://github.com/tsu-moe/tsu-stack) - An opinionated and batteries-included monorepo template from Luzefiru, built on tanstarter-monorepo, with Paraglide.js (i18n), Hono, oRPC, and more.
