import axios from 'axios';
import type { Note } from '../types/note';

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
const API_URL = "https://notehub-public.goit.study/api/notes";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

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
  const response = await axios.get<FetchNotesResponse>(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: query
  });
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`${API_URL}/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export interface NewNote {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (note: NewNote): Promise<Note> => {
  const response = await axios.post<Note>(`${API_URL}`, note, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const response = await axios.get<Note>(`${API_URL}/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}