import css from "./Modal.module.css";

const Modal = () => {
  return (
    <div>
      <div className={css.backdrop} role="dialog" aria-modal="true">
        <div className={css.modal}>{/* */}</div>
      </div>
    </div>
  );
};
export default Modal;
