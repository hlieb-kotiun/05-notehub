import axios from "axios";
import type { Note } from "../types/note";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;
const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});
api.defaults.headers.common.Authorization = `Bearer ${token}`;

interface ApiResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  query: string,
  page: number,
): Promise<ApiResponse> => {
  console.log(token);

  try {
    const { data } = await api.get<ApiResponse>("/notes", {
      params: {
        search: query,
        page,
      },
    });

    return data;
  } catch (error) {
    throw new Error("Something went wrong !", error as ErrorOptions);
  }
};

export const createNote = async () => {};

export const deleteNote = async () => {};
