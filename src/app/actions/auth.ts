'use server';

import { db } from '@/db';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

// ── Sign Up ───────────────────────────────────────────────────────────────────
export async function signupAction(_prevState: { error: string } | null | undefined, formData: FormData) {
  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const password = formData.get('password') as string;
  const confirm = formData.get('confirm') as string;

  if (!name || !email || !password || !confirm) {
    return { error: 'All fields are required.' };
  }
  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.' };
  }
  if (password !== confirm) {
    return { error: 'Passwords do not match.' };
  }

  try {
    const existing = await db.users.findByEmail(email);
    if (existing) return { error: 'An account with this email already exists.' };

    const passwordHash = await bcrypt.hash(password, 12);
    await db.users.create({ name, email, passwordHash });
  } catch {
    return { error: 'Could not create account. Please try again.' };
  }

  const { redirect } = await import('next/navigation');
  redirect('/login?registered=1');
}

// ── Log In ────────────────────────────────────────────────────────────────────
export async function loginAction(_prevState: { error: string } | null | undefined, formData: FormData) {
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  try {
    const { signIn } = await import('@/auth');
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard',
    });
  } catch (error: any) {
    if (error.type === 'CredentialsSignin') {
      return { error: 'Invalid email or password.' };
    }
    // NextAuth throws NEXT_REDIRECT for successful redirects, so we must rethrow
    throw error;
  }
}

// ── Log Out ───────────────────────────────────────────────────────────────────
export async function logoutAction() {
  const { signOut } = await import('@/auth');
  await signOut({ redirectTo: '/' });
}
