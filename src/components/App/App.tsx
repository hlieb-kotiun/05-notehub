import { useState } from "react";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";

function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data } = useQuery({
    queryKey: ["notes", query, page],
    queryFn: () => {
      return fetchNotes(query, page);
    },
    placeholderData: keepPreviousData,
  });

  console.log("data : ", data);
  const hasNotes = data && data?.notes.length > 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
      {hasNotes && <NoteList notes={data?.notes} />}
    </div>
  );
}

export default App;
