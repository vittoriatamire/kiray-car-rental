import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Settings2, Fuel, Users, CalendarDays, ShieldCheck, MapPin } from 'lucide-react';
import { db } from '@/db';
import styles from './CarDetails.module.css';

export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const carId = parseInt(id, 10);
  
  if (isNaN(carId)) {
    notFound();
  }

  const car = await db.cars.findById(carId);

  if (!car) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/rent" className={styles.backLink}>
          <ArrowLeft size={20} /> Back to Cars
        </Link>

        <div className={styles.grid}>
          <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} />
            </div>
            
            {/* Description or Features could go here */}
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px' }}>Vehicle Information</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Experience the thrill of driving the {car.brand} {car.model}. This {car.year} {car.type.toLowerCase()} 
                offers exceptional performance, comfort, and state-of-the-art technology. Perfect for both city cruising 
                and long road trips, ensuring every journey is memorable.
              </p>
            </div>
          </div>

          <div className={styles.detailsSection}>
            <div className={styles.header}>
              <div className={styles.brand}>{car.brand}</div>
              <h1 className={styles.model}>{car.model}</h1>
              <div className={styles.price}>
                ${car.pricePerDay} <span className={styles.period}>/ day</span>
              </div>
            </div>

            <div className={styles.specs}>
              <div className={styles.specItem}>
                <div className={styles.specIcon}><Settings2 size={24} /></div>
                <div>
                  <div className={styles.specLabel}>Transmission</div>
                  <div className={styles.specValue}>{car.transmission}</div>
                </div>
              </div>
              <div className={styles.specItem}>
                <div className={styles.specIcon}><Fuel size={24} /></div>
                <div>
                  <div className={styles.specLabel}>Fuel Type</div>
                  <div className={styles.specValue}>{car.fuelType}</div>
                </div>
              </div>
              <div className={styles.specItem}>
                <div className={styles.specIcon}><Users size={24} /></div>
                <div>
                  <div className={styles.specLabel}>Seats</div>
                  <div className={styles.specValue}>{car.seats} Passengers</div>
                </div>
              </div>
              <div className={styles.specItem}>
                <div className={styles.specIcon}><CalendarDays size={24} /></div>
                <div>
                  <div className={styles.specLabel}>Year</div>
                  <div className={styles.specValue}>{car.year}</div>
                </div>
              </div>
            </div>

            <button className={`btn btn-primary ${styles.rentBtn}`}>
              Proceed to Rent
            </button>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                <ShieldCheck size={18} style={{ color: 'var(--primary-color)' }} />
                <span>Comprehensive Insurance Included</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                <MapPin size={18} style={{ color: 'var(--primary-color)' }} />
                <span>Available for pick-up in Addis Ababa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
