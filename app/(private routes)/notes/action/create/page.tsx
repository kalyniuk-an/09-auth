import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Note',
  description: 'Create a new note in NoteHub',
  openGraph: {
    title: 'Create Note',
    description: 'Create a new note in NoteHub',
    url: 'https://08-zustand-six-delta.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://08-zustand-six-delta.vercel.app/notes/action/create/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        {/* NoteForm component */}
        <NoteForm />
      </div>
    </main>
  );
}
  
