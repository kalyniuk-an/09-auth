import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import { nextServer } from './api';
import { cookies } from 'next/headers';


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

export interface NewNote {
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
  // const accessToken = cookieStore.get('accessToken')?.value;
  
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
    headers: {
      Cookie: cookieStore.toString(),
    },
    params: query
  });
  return response.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  });
  return response.data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();

  const response = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    }
  });

  return response;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const response = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    }
  });

  return response.data;
};