import { db } from '@/db';
import RentPageClient from './RentPageClient';

export default async function RentPage() {
  const cars = await db.cars.findMany();
  return <RentPageClient cars={cars} />;
}
