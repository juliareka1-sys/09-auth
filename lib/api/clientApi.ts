import { proxyApiNH } from './api';
import { Note, CreateNotePayload } from '@/types/note';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
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
