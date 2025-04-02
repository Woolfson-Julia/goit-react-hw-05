import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchMovieCast } from "../../moviesService";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCast() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch {
        setError(true);
        toast.error("Please reload there was an error!!!!");
      } finally {
        setIsLoading(false);
      }
    }
    getCast();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {cast.length > 0 && (
        <ul className={css.list}>
          {cast.map((item) => (
            <li key={item.id} className={css.item}>
              <p className={css.text}>{item.name}</p>
              {item.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                  alt={item.name}
                  width={130}
                  className={css.img}
                />
              )}
            </li>
          ))}
        </ul>
      )}
      {!isLoading && !error && cast.length === 0 && (
        <p className={css.textInfo}>No info about cast</p>
      )}
    </>
  );
}
