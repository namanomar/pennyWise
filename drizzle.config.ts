import { defineConfig } from 'drizzle-kit';

// Define the configuration type
type Config = {
  schema: string;
  dialect: "postgresql";
  dbCredentials: { url: string  };
  verbose: true;
  strict: true;
};

// Export the configuration using the `defineConfig` function
export default defineConfig({
  schema: "./utils/schema.ts",
  out:"drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL,
  },
  verbose: true,
  strict: true,
} as Config);
