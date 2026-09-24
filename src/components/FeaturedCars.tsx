'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight, Settings2, Fuel, Users } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import styles from './FeaturedCars.module.css';

type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  pricePerDay: string;
  imageUrl: string;
  transmission: string;
  fuelType: string;
  seats: number;
};

export default function FeaturedCars({ cars }: { cars: Car[] }) {
  const { t } = useLang();

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <div className={styles.badge}>
              <Sparkles size={16} />
              <span>{t.recommendedBadge}</span>
            </div>
            <h2 className={styles.title}>{t.featuredTitle}</h2>
          </div>
          <Link href="/rent" className={styles.viewAll}>
            {t.viewAll} <ArrowRight size={20} />
          </Link>
        </div>

        <div className={styles.grid}>
          {cars.map((car) => (
            <div key={car.id} className={styles.card}>
              <div className={styles.imageContainer}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} className={styles.image} />
              </div>

              <div className={styles.content}>
                <h3 className={styles.brand}>{car.brand}</h3>
                <p className={styles.model}>{car.model} • {car.year}</p>

                <div className={styles.features}>
                  <div className={styles.feature}>
                    <Settings2 size={16} className={styles.featureIcon} />
                    {car.transmission}
                  </div>
                  <div className={styles.feature}>
                    <Fuel size={16} className={styles.featureIcon} />
                    {car.fuelType}
                  </div>
                  <div className={styles.feature}>
                    <Users size={16} className={styles.featureIcon} />
                    {car.seats} {t.seats}
                  </div>
                </div>

                <div className={styles.footer}>
                  <div>
                    <span className={styles.price}>${car.pricePerDay}</span>
                    <span className={styles.period}>{t.perDay}</span>
                  </div>
                  <Link href={`/cars/${car.id}`} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.875rem' }}>
                    {t.rentNow}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
