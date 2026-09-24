'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { signupAction } from '@/app/actions/auth';
import styles from '../login/AuthPage.module.css';

export default function SignupPage() {
  const [state, action, pending] = useActionState(signupAction, null);

  return (
    <div className={styles.page}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
        alt=""
        className={styles.bgImage}
        aria-hidden="true"
      />
      <div className={styles.overlay} />

      <div className={styles.card}>
        <Link href="/" className={styles.logo}>Kiray<span>.</span></Link>

        <h1 className={styles.title}>Create your account</h1>
        <p className={styles.subtitle}>Join Kiray and find your perfect ride</p>

        {state?.error && (
          <div className={styles.errorBanner}>{state.error}</div>
        )}

        <form action={action} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="signup-name" className={styles.label}>Full Name</label>
            <div className={styles.inputWrapper}>
              <User size={18} className={styles.inputIcon} />
              <input
                id="signup-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Abebe Girma"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="signup-email" className={styles.label}>Email</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input
                id="signup-email"
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
            <label htmlFor="signup-password" className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                id="signup-password"
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="Min. 8 characters"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="signup-confirm" className={styles.label}>Confirm Password</label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                id="signup-confirm"
                name="confirm"
                type="password"
                required
                autoComplete="new-password"
                placeholder="••••••••"
                className={styles.input}
              />
            </div>
          </div>

          <button
            id="signup-submit"
            type="submit"
            disabled={pending}
            className={styles.submitBtn}
          >
            {pending ? (
              <><Loader2 size={18} className={styles.spinner} /> Creating account…</>
            ) : (
              <>Create Account <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <p className={styles.switchText}>
          Already have an account?{' '}
          <Link href="/login" className={styles.switchLink}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
