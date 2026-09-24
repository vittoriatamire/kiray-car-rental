'use client';

import { Search, MapPin, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const { t } = useLang();

  return (
    <section className={styles.hero}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
        alt="Porsche 911"
        className={styles.bgImage}
      />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className="animate-fade-in-up">
          <h1 className={styles.title}>
            {t.heroLine1} <br />
            <span className={styles.highlight}>{t.heroLine2}</span>
          </h1>
        </div>

        <div className={`${styles.searchContainer} animate-fade-in-up delay-200`}>
          <form className={styles.searchBox}>
            <div className={styles.inputGroup}>
              <Search className={styles.icon} size={20} />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className={styles.input}
              />
            </div>

            <div className={styles.divider} />

            <div className={styles.inputGroup}>
              <MapPin className={styles.icon} size={20} />
              <input
                type="text"
                placeholder={t.locationPlaceholder}
                className={styles.input}
                defaultValue="Addis Ababa"
              />
            </div>

            <button type="button" className={styles.filtersBtn}>
              <SlidersHorizontal size={20} />
              <span>{t.filters}</span>
            </button>

            <button type="submit" className={`btn btn-primary ${styles.searchBtn}`}>
              {t.search} <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
