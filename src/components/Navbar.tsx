'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CarFront, Coins, Tag, Users, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { logoutAction } from '@/app/actions/auth';
import styles from './Navbar.module.css';

export default function Navbar({ session }: { session: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>

        <Link href="/" className={styles.logo}>
          Kiray<span>.</span>
        </Link>

        <div className={styles.navLinks}>
          <Link href="/rent"    className={styles.navLink}><CarFront size={15} />{t.rent}</Link>
          <Link href="/buy"     className={styles.navLink}><Coins    size={15} />{t.buy}</Link>
          <Link href="/sell"    className={styles.navLink}><Tag      size={15} />{t.sell}</Link>
          <Link href="/dealers" className={styles.navLink}><Users    size={15} />{t.dealers}</Link>
        </div>

        <div className={styles.actions}>
          <div className={styles.langToggle} aria-label="Language switcher">
            <button
              id="lang-en"
              onClick={() => setLang('en')}
              className={`${styles.langPill} ${lang === 'en' ? styles.langPillActive : ''}`}
            >
              EN
            </button>
            <button
              id="lang-am"
              onClick={() => setLang('am')}
              className={`${styles.langPill} ${lang === 'am' ? styles.langPillActive : ''}`}
            >
              አማ
            </button>
          </div>

          <div className={styles.desktopActions}>
            {session ? (
              <>
                <Link href="/dashboard" className={styles.navLink} style={{ gap: '6px' }}>
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <form action={logoutAction}>
                  <button type="submit" className={styles.loginBtn} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <LogOut size={16} /> Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login"  id="nav-login"  className={styles.loginBtn}>{t.login}</Link>
                <Link href="/signup" id="nav-signup" className={styles.signupBtn}>{t.signup}</Link>
              </>
            )}
          </div>

          <button className={styles.burgerBtn} onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileNavLinks}>
          <Link href="/rent"    className={styles.mobileNavLink} onClick={closeMobileMenu}><CarFront size={18} />{t.rent}</Link>
          <Link href="/buy"     className={styles.mobileNavLink} onClick={closeMobileMenu}><Coins    size={18} />{t.buy}</Link>
          <Link href="/sell"    className={styles.mobileNavLink} onClick={closeMobileMenu}><Tag      size={18} />{t.sell}</Link>
          <Link href="/dealers" className={styles.mobileNavLink} onClick={closeMobileMenu}><Users    size={18} />{t.dealers}</Link>
        </div>
        
        <div className={styles.mobileActions}>
          {session ? (
            <>
              <Link href="/dashboard" className={styles.mobileNavLink} onClick={closeMobileMenu} style={{ gap: '8px' }}>
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <form action={logoutAction} onSubmit={closeMobileMenu} style={{ width: '100%' }}>
                <button type="submit" className={styles.mobileLoginBtn} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <LogOut size={18} /> Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login"  id="mobile-nav-login"  className={styles.mobileLoginBtn} onClick={closeMobileMenu}>{t.login}</Link>
              <Link href="/signup" id="mobile-nav-signup" className={styles.mobileSignupBtn} onClick={closeMobileMenu}>{t.signup}</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
