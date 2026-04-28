import axios from "axios";
import type { NewNote, Note } from "../types/note";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;
const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});
api.defaults.headers.common.Authorization = `Bearer ${token}`;

interface ApiResponse {
  notes: Note[];
  totalPages: number;
}

// Fetch all notes
export const fetchNotes = async (
  query: string,
  page: number,
): Promise<ApiResponse> => {
  try {
    const { data } = await api.get<ApiResponse>("/notes", {
      params: {
        search: query,
        page,
      },
    });

    return data;
  } catch (error) {
    throw new Error(
      "Something went wrong by fetching notes!",
      error as ErrorOptions,
    );
  }
};

// Create new note
export const createNote = async (data: NewNote): Promise<Note> => {
  try {
    const res = await api.post<Note>("/notes", data);
    return res.data;
  } catch (error) {
    throw new Error(
      "Something went wrong by creating new note!",
      error as ErrorOptions,
    );
  }
};

// Delete note by id
export const deleteNote = async (id: string) => {
  try {
    await api.delete(`/notes/${id}`);
  } catch (error) {
    throw new Error(
      "Something went wrong by creating new note!",
      error as ErrorOptions,
    );
  }
};
