import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { useSearchParams, Link, useLocation } from "react-router-dom";
import { fetchSearchMovie } from "../../moviesService";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MoviesPage.module.css"


export default function MoviesPage() {

  const [movieSearch, setMovieSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  const query = searchParams.get('query') ?? '';
  const [debounceQuery] = useDebounce(query, 300);
  const changeSearchText = (event) => {
    const nextParams = new URLSearchParams(searchParams);
    if (event.target.value !== '') {
      nextParams.set("query", event.target.value);
    } else {
      nextParams.delete('query');
    }
      setSearchParams(nextParams); 
  }


  useEffect(() => {
    if (debounceQuery.trim() === "") {
      return;
    }
    async function getSearchMovie() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchSearchMovie(debounceQuery);
        setMovieSearch(data);
      } catch {
        setError(true);
        toast.error("Please reload there was an error!!!!");
      } finally {
        setIsLoading(false);
      }
    }
    getSearchMovie();
  }, [debounceQuery]);

  return (
    <div>
      <div className={css.container}>
        <input
          type="text"
          value={query}
          onChange={changeSearchText}
          className={css.input}
        />
        <IoSearch className={css.icon} />
      </div>
      {movieSearch.length > 0 && (
        <ul className={css.list}>
          {movieSearch.map((movie) => (
            <li key={movie.id} className={css.item}>
              <Link to={`/movies/${movie.id}`} state={location}>
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`"${movie.title}" movie poster`}
                    width={200}
                    className={css.img}
                  />
                ) : (
                  <h2 className={css.title}>{movie.title}</h2>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
}
