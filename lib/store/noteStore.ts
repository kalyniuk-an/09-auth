import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewNote } from '@/lib/api';

interface NoteDraftStore {
  draft: NewNote;
  setDraft: (draft: NewNote) => void;
  clearDraft: () => void;
}

const initialDraft: NewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteDraftStore>()(
  persist(
  (set) => ({
    draft: initialDraft,
    setDraft: (draft) => set({ draft }),
    clearDraft: () => set({ draft: initialDraft }),
  }),
  {
    name: 'note-storage',
    partialize: (state) => ({ draft: state.draft }),
  }
));

