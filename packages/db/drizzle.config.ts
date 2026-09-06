import type { Config } from "drizzle-kit";
import { ENV } from "varlock/env";

export default {
  out: "./migrations",
  schema: "./src/schema/index.ts",
  breakpoints: true,
  verbose: true,
  strict: true,

  dialect: "postgresql",
  dbCredentials: {
    url: ENV.DATABASE_URL,
  },
} satisfies Config;
