import HeroSection from '@/components/HeroSection';
import FeaturedCars from '@/components/FeaturedCars';
import Brands from '@/components/Brands';
import { db } from '@/db';

export default async function Home() {
  const [allCars, brands] = await Promise.all([
    db.cars.findMany(),
    db.brands.findMany(),
  ]);
  const featuredCars = allCars.slice(0, 6);

  return (
    <>
      <HeroSection />
      <FeaturedCars cars={featuredCars} />
      <Brands brands={brands} />
    </>
  );
}
