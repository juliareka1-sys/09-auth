import { cookies } from 'next/headers';
import { proxyApiNH } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  searchQuery: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> => {
  const cookiesStore = await cookies();
  const response = await proxyApiNH.get<FetchNotesResponse>('/notes', {
    params: {
      search: searchQuery,
      page,
      tag: tag === 'all' ? undefined : tag,
      perPage: 12,
    },
    headers: { Cookie: cookiesStore.toString() },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookiesBox = await cookies();
  const responseById = await proxyApiNH.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookiesBox.toString() },
  });
  return responseById.data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();
  const response = await proxyApiNH.get('/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  });
  return response;
};

export const getMe = async () => {
  const cookieStore = await cookies();
  const response = await proxyApiNH.get<User>('/users/me', {
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
};
