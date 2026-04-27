import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  console.log("notes ", notes);

  return (
    <div>
      <ul className={css.list}>
        {/* Набір елементів списку нотаток */}
        {notes.map((note) => {
          return (
            <li key={`note-${note.id}`} className={css.listItem}>
              <h2 className={css.title}>{note.title}</h2>
              <p className={css.content}>{note.content}</p>
              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                <button className={css.button}>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default NoteList;
