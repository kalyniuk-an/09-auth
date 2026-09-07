import type { Note } from '@/types/note';
import { User } from '@/types/user';
import { nextServer } from './api';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  perPage?: 12;
  search?: string;
  tag?: string;
  sortBy?: "created" | "updated";
}

export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
  const { page, perPage, search, tag, sortBy } = params;
  const query: Record<string, unknown> = {
    page,
    perPage
  };
  if (search) {
    query.search = search;
  }
  if (tag) {
    query.tag = tag;
  }
  if (sortBy) {
    query.sortBy = sortBy;
  }
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params: query
  });
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);
  return response.data;
}

export interface NewNote {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (note: NewNote): Promise<Note> => {
  const response = await nextServer.post<Note>('/notes', note);
  return response.data;
}

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${noteId}`);
  return response.data;
}

export const register = async (email: string, password: string): Promise<User>=>{ 
  const response = await nextServer.post<User>('/auth/register', {email, password});
  return response.data;
}