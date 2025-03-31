import toast from "react-hot-toast";
import clsx from "clsx";
import { Suspense, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useParams, Link, useLocation } from "react-router";
import { fetchMovieById } from "../../moviesService";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state);

  const getLinkStyles = ({ isActive }) => {
    return clsx(css.itemLink, isActive && css.active);
  }

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch {
        setError(true);
        toast.error("Please reload there was an error!!!!");
      } finally {
        setIsLoading(false);
      }
    }
    getMovie();
  }, [movieId]);

  return (
    <>
      <Link to={backLinkRef.current ?? "/movies"} className={css.link}>
        Go Back
      </Link>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movie && (
        <div className={css.container}>
          <div className={css.containerImg}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`"${movie.title}" movie poster`}
                className={css.img}
                width={300}
              />
            )}
            <div className={css.containerInfo}>
              <p className={css.text}>{`Release: ${movie.release_date}`}</p>
              <ul className={css.list}>
                Genre:
                {movie.genres.map((item) => (
                  <li key={item.id} className={css.item}>
                    {item.name}
                  </li>
                ))}
              </ul>
              <p className={css.text}>{`Rating: ${movie.vote_average}`}</p>
            </div>
          </div>
          <div>
            <h2 className={css.title}>{movie.title}</h2>
            <p className={css.textOverview}>{movie.overview}</p>
            <ul className={css.listLink}>
              <li>
                <NavLink to="cast" className={getLinkStyles}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" className={getLinkStyles}>
                  Reviews
                </NavLink>
              </li>
            </ul>
            <Suspense>
              <Outlet />
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
}
