
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'

const sql = neon("postgresql://test_owner:c4TqlZX0msvN@ep-mute-moon-a5flwviy.us-east-2.aws.neon.tech/expense?sslmode=require");
export const db = drizzle(sql);

// const result = await db.select().from(...);