import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import css from "./SearchBar.module.css"

export default function SearchBar({ onSubmit }) {
  const [values, setValues] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!values.trim()) {
      toast.error("This field must be filled in!!!");
      return;
    }
    onSubmit(values);
    setValues('');
    
  }
  const handleInputChange = (event) => {
    setValues(event.target.value);
  }

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          value={values}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
        <button className={css.button} type="submit">
          Search
        </button>
        <Toaster position="top-right" />
      </form>
    </header>
  );
}
