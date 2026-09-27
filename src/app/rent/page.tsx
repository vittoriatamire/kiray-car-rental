import { db } from '@/db';
import RentPageClient from './RentPageClient';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default async function RentPage() {
  const cars = await db.cars.findMany();
  return <RentPageClient cars={cars} />;
}
