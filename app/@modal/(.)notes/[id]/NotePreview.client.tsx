'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import { useParams, useRouter } from 'next/navigation';
import css from "./NotePreview.module.css";
import { Note } from '@/types/note';
import Loader from '@/app/loading';
import Modal from '@/components/Modal/Modal';


export default function NotePreview() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;
  if (isError || !note) return <div>Error fetching note</div>;

  return (
    <Modal onClose={() => router.back()}>
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>Created: {note.createdAt}</p>
          </div>
        </div>
      </main>
    </Modal>
  );
}