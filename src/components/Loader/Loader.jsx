import ClipLoader from "react-spinners/ClipLoader";
import css from "./Loader.module.css"

export default function Loader() {
  return (
    <div className={css.container}>
      <ClipLoader
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
