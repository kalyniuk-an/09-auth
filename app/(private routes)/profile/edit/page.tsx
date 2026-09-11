'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { updateMe } from '@/lib/api/clientApi';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const handleSubmit = async (formData: FormData) => {
    try {
      const name = formData.get('username') as string;
      const res = await updateMe(name);
      if (res) {
        setUser(res);
        router.push('/profile');
      }
    } catch {
      router.push('/profile');
    }
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        {user &&(
          <Image src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input id="username"
              name="username"
              type="text"
              className={css.input}
              required
              defaultValue={user?.username}
            />
          </div>

          <p>Email: { user?.email }</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton}
              onClick={()=>router.push('/profile')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
