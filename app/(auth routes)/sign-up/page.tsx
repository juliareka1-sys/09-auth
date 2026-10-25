'use client';
import css from './SignUpPage.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterData } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore(state => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    try {
      const regUserData: RegisterData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };
      const registrationResult = await register(regUserData);
      if (registrationResult) {
        setUser(registrationResult);
        router.push('/profile');
      } else {
        setError('Registration failed');
      }
    } catch {
      setError('Registration failed');
    }
  };
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUp;
