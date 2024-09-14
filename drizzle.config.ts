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
    url: "postgresql://test_owner:c4TqlZX0msvN@ep-mute-moon-a5flwviy.us-east-2.aws.neon.tech/expense?sslmode=require",
  },
  verbose: true,
  strict: true,
} as Config);
