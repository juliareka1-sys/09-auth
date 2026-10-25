import css from '@/app/Home.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page not found | NoteHub',
  description: 'Sorry, there is no such page',
  openGraph: {
    title: '404 - Page not found | NoteHub',
    description: 'Sorry, there is no such page',
    url: 'https://09-auth-umber-nine.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: '404 - Page not found | NoteHub',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
