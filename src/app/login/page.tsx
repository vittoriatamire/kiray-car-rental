'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { loginAction } from '@/app/actions/auth';
import styles from './AuthPage.module.css';

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, null);
  const params = useSearchParams();
  const justRegistered = params.get('registered') === '1';

  return (
    <div className={styles.page}>
      {/* Background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
        alt=""
        className={styles.bgImage}
        aria-hidden="true"
      />
      <div className={styles.overlay} />

      <div className={styles.card}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>Kiray<span>.</span></Link>

        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to your account to continue</p>

        {justRegistered && (
          <div className={styles.successBanner}>
            🎉 Account created! Please log in.
          </div>
        )}

        {state?.error && (
          <div className={styles.errorBanner}>{state.error}</div>
        )}

        <form action={action} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="login-email" className={styles.label}>Email</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input
                id="login-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="login-password" className={styles.label}>Password</label>
              <Link href="/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
            </div>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                id="login-password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className={styles.input}
              />
            </div>
          </div>

          <button
            id="login-submit"
            type="submit"
            disabled={pending}
            className={styles.submitBtn}
          >
            {pending ? (
              <><Loader2 size={18} className={styles.spinner} /> Signing in…</>
            ) : (
              <>Sign In <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <p className={styles.switchText}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" className={styles.switchLink}>Sign up free</Link>
        </p>
      </div>
    </div>
  );
}
