import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { varlockVitePlugin } from "@varlock/vite-integration";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite-plus";

export default defineConfig({
  run: {
    // Vite Task
    // https://viteplus.dev/config/run
    // https://viteplus.dev/guide/run
    // https://viteplus.dev/guide/cache
    tasks: {
      build: {
        // When deploying, use `vp run build` as the build command, not `vp build`
        command: "cross-env NODE_ENV=production vp build",
        env: ["NITRO_PRESET"],
        input: [
          { auto: true },
          "!**/.output/**",
          "!**/.vercel/**",
          "!**/.netlify/**",
          "!**/build/**",
          "!**/.wrangler/**",
          "!**/dist/**",
          "!**/*.tsbuildinfo",
          "!**/node_modules/.vite/**",
          "!**/node_modules/.vite-temp/**",
          "!**/node_modules/.nitro/**",
        ],
      },
    },
  },

  server: {
    port: 3000,
  },
  plugins: [
    devtools({
      // https://tanstack.com/devtools/latest/docs/vite-plugin#console-piping
      consolePiping: { enabled: false },
    }),
    // https://varlock.dev/integrations/tanstack-start/
    varlockVitePlugin(),
    tanstackStart(),
    // https://tanstack.com/start/latest/docs/framework/react/guide/hosting
    nitro({
      // fixes SSR issues with Vite 8:
      // https://discord.com/channels/719702312431386674/1490005967067414608/1490634230458224751
      traceDeps: ["react", "react-dom"],
      /**
       * FIXME: invalid ssr_exports from build, remove this once the Rolldown fix is out
       * @see https://github.com/TanStack/router/issues/8031
       */
      inlineDynamicImports: true,
      /**
       * TODO(security): Review production security headers before deployment.
       *
       * App-level policies such as CSP, Permissions-Policy, X-Frame-Options /
       * frame-ancestors, COOP, Referrer-Policy, and X-Content-Type-Options are
       * intentionally not configured by the TanStarter template (which this project
       * is based on) because safe values depend on the app's embedding requirements,
       * browser APIs, integrations, and content.
       */
    }),
    viteReact({ compiler: true }),
    tailwindcss(),
  ],
});
