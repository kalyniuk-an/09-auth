import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getMe } from '@/lib/api/serverApi';
import css from './ProfilePage.module.css';

const myURL = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub is a simple and user-friendly application for managing personal notes',
  openGraph: {
    title: 'NoteHub',
    description: 'NoteHub is a simple and user-friendly application for managing personal notes',
    url: `${myURL}`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function ProfilePage() {
  const user = await getMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src="user_avatar"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>
            Username: {user.username}
          </p>
          <p>
            Email: {user.email}
          </p>
        </div>
      </div>
    </main>
  )
}