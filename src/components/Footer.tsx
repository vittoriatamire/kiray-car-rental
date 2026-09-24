'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            Kiray<span>.</span>
          </Link>
          <p className={styles.description}>{t.footerDesc}</p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialIcon}><Facebook size={20} /></a>
            <a href="#" className={styles.socialIcon}><Twitter size={20} /></a>
            <a href="#" className={styles.socialIcon}><Instagram size={20} /></a>
          </div>
        </div>

        <div className={styles.column}>
          <h4>{t.quickLinks}</h4>
          <div className={styles.links}>
            <Link href="/buy">{t.buyCar}</Link>
            <Link href="/rent">{t.rentCar}</Link>
            <Link href="/sell">{t.sellCar}</Link>
            <Link href="/dealers">{t.findDealer}</Link>
          </div>
        </div>

        <div className={styles.column}>
          <h4>{t.resources}</h4>
          <div className={styles.links}>
            <Link href="/calculator">{t.loanCalc}</Link>
            <Link href="/car-valuation">{t.carValuation}</Link>
            <Link href="/guide">{t.buyingGuide}</Link>
            <Link href="/privacy">{t.privacy}</Link>
          </div>
        </div>

        <div className={styles.column}>
          <h4>{t.contactUs}</h4>
          <div className={styles.links}>
            <div className={styles.contactItem}>
              <MapPin size={20} className={styles.contactIcon} />
              <span>{t.address}</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={20} className={styles.contactIcon} />
              <span>+251 000-0000</span>
            </div>
            <div className={styles.contactItem}>
              <Mail size={20} className={styles.contactIcon} />
              <span>hello@kiray.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>{t.copyright}</p>
      </div>
    </footer>
  );
}
