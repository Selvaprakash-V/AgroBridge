import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/drizzle/schema";

// Prefer the pooler URL because the direct host is not resolving in this environment.
const connectionString = process.env.POSTGRES_URL ?? process.env.DATABASE_URL!;
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
