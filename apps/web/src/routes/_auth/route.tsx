import { authQueryOptions } from "@repo/auth/tanstack/queries";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

/**
 * This is the _auth layout, which enables 'protected routes'
 * for all child routes under _auth (e.g. _auth/app/*)
 *
 * The returned context from beforeLoad is also available to all child routes & loaders.
 */
export const Route = createFileRoute("/_auth")({
  component: Outlet,
  beforeLoad: async ({ context }) => {
    /**
     * beforeLoad runs on every navigation and prefetch, so we use TanStack Query
     * for client-side caching to speed up navigation, reducing client-to-server calls.
     *
     * Better Auth's cookieCache is also enabled in `packages/auth/src/auth.ts`,
     * which can further reduce server-to-database calls.
     *
     * Both cache layers help for faster UX and page load/navigation.
     *
     * But this is NOT a server-side security guarantee.
     * Consider authMiddleware for data fetching operations & mutations
     * where auth is required, e.g. for API routes and server functions.
     * see `packages/auth/src/tanstack/middleware.ts`
     */
    const user = await context.queryClient.ensureQueryData({
      ...authQueryOptions(),
      revalidateIfStale: true,
    });
    if (!user) {
      throw redirect({ to: "/login" });
    }

    /**
     * If we need auth data in other loaders/beforeLoad,
     * use `authQueryOptions` with `context.queryClient`,
     * similar to what we already do here.
     *
     * Prefer this approach instead of passing user to router/loader context,
     * for simpler centralized revalidation via TanStack Query.
     */
  },
});
