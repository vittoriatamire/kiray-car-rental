'use client';

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import styles from './Brands.module.css';

type Brand = { name: string; logo: string };

export default function Brands({ brands }: { brands: Brand[] }) {
  const { t } = useLang();

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>{t.brandsTitle}</h2>

        <div className={styles.grid}>
          {brands.map((brand) => (
            <Link key={brand.name} href={`/rent?brand=${brand.name.toLowerCase()}`} className={styles.brandCard}>
              <div className={styles.name}>{brand.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
