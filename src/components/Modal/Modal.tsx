import { createPortal } from "react-dom";
import NoteForm from "../NoteForm/NoteForm";
import css from "./Modal.module.css";
import { useEffect } from "react";
import type { NewNote } from "../../types/note";

interface ModalProps {
  onClose: () => void;
  onSubmit: (data: NewNote) => void;
}

const Modal = ({ onClose, onSubmit }: ModalProps) => {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    addEventListener("keydown", close);

    return () => removeEventListener("keydown", close);
  });

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div>
      <div
        onClick={handleBackdropClick}
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
      >
        <div className={css.modal}>
          <NoteForm onClose={onClose} onSubmit={onSubmit} />
        </div>
      </div>
    </div>,
    document.body,
  );
};
export default Modal;
