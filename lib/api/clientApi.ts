import { proxyApiNH } from './api';
import { Note, CreateNotePayload } from '@/types/note';
import { User } from '@/types/user';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface CheckSessionResponse {
  success: boolean;
}

export const fetchNotes = async (
  searchQuery: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await proxyApiNH.get<FetchNotesResponse>('/notes', {
    params: {
      search: searchQuery,
      page,
      tag: tag === 'all' ? undefined : tag,
      perPage: 12,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const responseById = await proxyApiNH.get<Note>(`/notes/${id}`);
  return responseById.data;
};

export const createNote = async (
  noteData: CreateNotePayload
): Promise<Note> => {
  const res = await proxyApiNH.post<Note>('/notes', noteData);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await proxyApiNH.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const register = async (data: RegisterData): Promise<User> => {
  const regResponse = await proxyApiNH.post<User>('/auth/register', data);
  return regResponse.data;
};

export const login = async (data: RegisterData): Promise<User> => {
  const regResponse = await proxyApiNH.post<User>('/auth/login', data);
  return regResponse.data;
};

export const getMe = async (): Promise<User> => {
  const getMeResp = await proxyApiNH.get<User>('/users/me');
  return getMeResp.data;
};

export const checkSession = async (): Promise<boolean> => {
  const checkResp = await proxyApiNH.get<CheckSessionResponse>('/auth/session');
  return checkResp.data.success;
};

export const logout = async (): Promise<void> => {
  await proxyApiNH.post('/auth/logout');
};
