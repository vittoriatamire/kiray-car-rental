import { pgTable, serial, text, integer, numeric, boolean, timestamp } from 'drizzle-orm/pg-core';

export const cars = pgTable('cars', {
  id: serial('id').primaryKey(),
  brand: text('brand').notNull(),
  model: text('model').notNull(),
  year: integer('year').notNull(),
  pricePerDay: numeric('price_per_day').notNull(),
  imageUrl: text('image_url').notNull(),
  type: text('type').notNull(),
  transmission: text('transmission').notNull(),
  fuelType: text('fuel_type').notNull(),
  seats: integer('seats').notNull(),
  available: boolean('available').default(true).notNull(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
