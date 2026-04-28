import { useState } from "react";
import css from "./App.module.css";
import { createNote, deleteNote, fetchNotes } from "../../services/noteService";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";
import Modal from "../Modal/Modal";
import type { NewNote } from "../../types/note";

function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["notes", query, page],
    queryFn: () => {
      return fetchNotes(query, page);
    },
    placeholderData: keepPreviousData,
  });

  // Create Note
  const { mutate: onNoteCreate } = useMutation({
    mutationFn: (data: NewNote) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  // Delete Note
  const { mutate: onNoteDelete } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSetQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    1000,
  );

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const handleCreateNote = (data: NewNote) => {
    onNoteCreate(data);
  };

  const handleDeleteNote = (id: string) => {
    onNoteDelete(id);
    setPage(1);
  };

  const hasNotes = data && data?.notes.length > 0;
  const showPagination = data && data.totalPages > 1;
  const totalPages = data ? data.totalPages : 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <input
          defaultValue={query}
          onChange={handleSetQuery}
          className={css.input}
          type="text"
          placeholder="Search notes"
        />

        {showPagination && (
          <Pagination
            totalPages={totalPages}
            onPageChange={handlePageChange}
            currentPage={page}
          />
        )}
        <button onClick={handleModalOpen} className={css.button}>
          Create note +
        </button>
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <p>An error occurred: {error.message}</p>}
      {hasNotes && <NoteList notes={data?.notes} onDelete={handleDeleteNote} />}
      {isModalOpen && (
        <Modal onSubmit={handleCreateNote} onClose={handleModalClose} />
      )}
    </div>
  );
}

export default App;
