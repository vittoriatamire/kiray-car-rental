import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './src/db/schema';
import { mockCars } from './src/db/mockData';
import { eq } from 'drizzle-orm';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log('Seeding database...');
  for (const car of mockCars) {
    const existing = await db.select().from(schema.cars).where(eq(schema.cars.id, car.id));
    if (existing.length === 0) {
      await db.insert(schema.cars).values(car);
      console.log(`Inserted car: ${car.brand} ${car.model}`);
    } else {
      console.log(`Car already exists: ${car.brand} ${car.model}`);
    }
  }
  console.log('Database seeding completed.');
}

seed().catch(console.error);
