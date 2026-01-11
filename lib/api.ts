import { CreateNote, Note } from "@/types/note";
import axios from "axios";

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

const MY_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const API = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${MY_KEY}`,
  },
});

export const fetchNotes = async (
  searchText: string,
  page: number
): Promise<NotesHttpResponse> => {
  const options = {
    params: {
      ...(searchText !== "" && { search: searchText }),
      page,
      perPage: 12,
    },
  };

  const { data } = await API.get<NotesHttpResponse>("/notes", options);
  return data;
};

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const { data } = await API.post<Note>("/notes", newNote);
  return data;
};

export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  const { data } = await API.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNotesById = async (id: Note["id"]): Promise<Note> => {
  const { data } = await API.get<Note>(`/notes${id}`);

  return data;
};
