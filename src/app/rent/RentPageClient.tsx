'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Settings2, Fuel, Users, SlidersHorizontal, X } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import styles from './RentPage.module.css';
import carStyles from '@/components/FeaturedCars.module.css';

type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  pricePerDay: string;
  imageUrl: string;
  type: string;
  transmission: string;
  fuelType: string;
  seats: number;
  available: boolean;
};

const CAR_TYPES = ['SUV', 'Sedan', 'Sports'];
const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric'];
const TRANSMISSIONS = ['Automatic', 'Manual'];
const MAX_PRICE = 500;

export default function RentPageClient({ cars }: { cars: Car[] }) {
  const { t } = useLang();

  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFuels, setSelectedFuels] = useState<string[]>([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  }

  function resetFilters() {
    setSearch('');
    setSelectedTypes([]);
    setSelectedFuels([]);
    setSelectedTransmissions([]);
    setMaxPrice(MAX_PRICE);
  }

  const filtered = useMemo(() => {
    return cars.filter(car => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        car.brand.toLowerCase().includes(q) ||
        car.model.toLowerCase().includes(q) ||
        car.type.toLowerCase().includes(q);

      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(car.type);
      const matchesFuel = selectedFuels.length === 0 || selectedFuels.includes(car.fuelType);
      const matchesTx = selectedTransmissions.length === 0 || selectedTransmissions.includes(car.transmission);
      const matchesPrice = parseFloat(car.pricePerDay) <= maxPrice;

      return matchesSearch && matchesType && matchesFuel && matchesTx && matchesPrice;
    });
  }, [cars, search, selectedTypes, selectedFuels, selectedTransmissions, maxPrice]);

  const hasActiveFilters =
    search || selectedTypes.length || selectedFuels.length ||
    selectedTransmissions.length || maxPrice < MAX_PRICE;

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Cars for Rent</h1>
          <p className={styles.subtitle}>Find the perfect vehicle for your next journey.</p>
        </div>

        <div className={styles.layout}>
          {/* ── Sidebar ─────────────────────────────────── */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <div className={styles.sidebarTitle}>
                <SlidersHorizontal size={18} />
                <span>{t.filters}</span>
              </div>
              {hasActiveFilters && (
                <button onClick={resetFilters} className={styles.resetBtn}>
                  <X size={14} /> Reset
                </button>
              )}
            </div>

            {/* Search */}
            <div className={styles.filterGroup}>
              <div className={styles.searchInputWrapper}>
                <Search size={16} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>

            {/* Car Type */}
            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Car Type</h3>
              <div className={styles.filterList}>
                {CAR_TYPES.map(type => (
                  <label key={type} className={styles.filterItem}>
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggle(selectedTypes, setSelectedTypes, type)}
                    />
                    <span>{type}</span>
                    <span className={styles.filterCount}>
                      {cars.filter(c => c.type === type).length}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fuel Type */}
            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Fuel Type</h3>
              <div className={styles.filterList}>
                {FUEL_TYPES.map(fuel => (
                  <label key={fuel} className={styles.filterItem}>
                    <input
                      type="checkbox"
                      checked={selectedFuels.includes(fuel)}
                      onChange={() => toggle(selectedFuels, setSelectedFuels, fuel)}
                    />
                    <span>{fuel}</span>
                    <span className={styles.filterCount}>
                      {cars.filter(c => c.fuelType === fuel).length}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Transmission */}
            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Transmission</h3>
              <div className={styles.filterList}>
                {TRANSMISSIONS.map(tx => (
                  <label key={tx} className={styles.filterItem}>
                    <input
                      type="checkbox"
                      checked={selectedTransmissions.includes(tx)}
                      onChange={() => toggle(selectedTransmissions, setSelectedTransmissions, tx)}
                    />
                    <span>{tx}</span>
                    <span className={styles.filterCount}>
                      {cars.filter(c => c.transmission === tx).length}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Max Price */}
            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>
                Max Price: <span className={styles.priceValue}>${maxPrice}/day</span>
              </h3>
              <input
                type="range"
                min={50}
                max={MAX_PRICE}
                step={10}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className={styles.priceRange}
              />
              <div className={styles.priceLabels}>
                <span>$50</span>
                <span>${MAX_PRICE}</span>
              </div>
            </div>
          </aside>

          {/* ── Car Grid ─────────────────────────────────── */}
          <main>
            <div className={styles.resultsBar}>
              <span className={styles.resultsCount}>
                {filtered.length} car{filtered.length !== 1 ? 's' : ''} found
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <p>No cars match your filters.</p>
                <button onClick={resetFilters} className="btn btn-primary" style={{ marginTop: 16 }}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={styles.grid}>
                {filtered.map((car) => (
                  <div key={car.id} className={carStyles.card}>
                    <div className={carStyles.imageContainer}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} className={carStyles.image} />
                    </div>

                    <div className={carStyles.content}>
                      <h3 className={carStyles.brand}>{car.brand}</h3>
                      <p className={carStyles.model}>{car.model} • {car.year}</p>

                      <div className={carStyles.features}>
                        <div className={carStyles.feature}>
                          <Settings2 size={16} className={carStyles.featureIcon} />
                          {car.transmission}
                        </div>
                        <div className={carStyles.feature}>
                          <Fuel size={16} className={carStyles.featureIcon} />
                          {car.fuelType}
                        </div>
                        <div className={carStyles.feature}>
                          <Users size={16} className={carStyles.featureIcon} />
                          {car.seats} {t.seats}
                        </div>
                      </div>

                      <div className={carStyles.footer}>
                        <div>
                          <span className={carStyles.price}>${car.pricePerDay}</span>
                          <span className={carStyles.period}>{t.perDay}</span>
                        </div>
                        <Link href={`/cars/${car.id}`} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.875rem' }}>
                          {t.rentNow}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
