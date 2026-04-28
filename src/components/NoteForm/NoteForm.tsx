import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import type { NewNote } from "../../types/note";
import * as Yup from "yup";

interface FormValues {
  title: string;
  content: string;
  tag: string;
}

interface NoteFormProps {
  onClose: () => void;
  onSubmit: (data: NewNote) => void;
}

const NoteForm = ({ onClose, onSubmit }: NoteFormProps) => {
  const initialValues = {
    title: "",
    content: "",
    tag: "Todo",
  };

  const NoteFormSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title must be at least 2 characters")
      .max(30, "Title is too long")
      .required("Title is required"),
    content: Yup.string().max(30, "Content is too long"),
    tag: Yup.string()
      .required("Tag is required")
      .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"]),
  });

  const handleSubmit = (
    values: FormValues,
    helper: FormikHelpers<FormValues>,
  ) => {
    onSubmit({
      title: values.title,
      content: values.content,
      tag: values.tag,
    });
    onClose();
    helper.resetForm();
  };

  return (
    <Formik
      validationSchema={NoteFormSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};
export default NoteForm;
