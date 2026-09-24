import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { mockCars, mockBrands } from './mockData';
import { eq } from 'drizzle-orm';

// ── Neon DB client (set DATABASE_URL in .env.local) ──────────────────────────
const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
const drizzleDb = sql ? drizzle(sql, { schema }) : null;

// ── Data access layer ─────────────────────────────────────────────────────────
export const db = {
  cars: {
    findMany: async () => {
      if (drizzleDb) return drizzleDb.select().from(schema.cars);
      return mockCars;
    },
    findById: async (id: number) => {
      if (drizzleDb) {
        const rows = await drizzleDb.select().from(schema.cars).where(eq(schema.cars.id, id));
        return rows[0] ?? null;
      }
      return mockCars.find(car => car.id === id) ?? null;
    },
  },

  brands: {
    findMany: async () => mockBrands,
  },

  users: {
    findByEmail: async (email: string) => {
      if (!drizzleDb) return null;
      const rows = await drizzleDb
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, email));
      return rows[0] ?? null;
    },
    create: async (data: { name: string; email: string; passwordHash: string }) => {
      if (!drizzleDb) throw new Error('DATABASE_URL is not configured.');
      const rows = await drizzleDb.insert(schema.users).values(data).returning();
      return rows[0];
    },
  },
};
