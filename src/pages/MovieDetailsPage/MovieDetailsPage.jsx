import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router";
import { fetchMovieById } from "../../moviesService";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";


export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movie && (
        <div>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={`"${movie.title}" movie poster`}
            />
            <h2>{movie.title}</h2>
          </div>
          <div>
            <p>{movie.release_date}</p>
            <ul>
              {movie.genres.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
            <p>{movie.vote_average}</p>
          </div>
          <p>{movie.overview}</p>
          <ul>
            <li>
              <NavLink to="cast">Cast</NavLink>
            </li>
            <li>
              <NavLink to="reviews">Reviews</NavLink>
            </li>
          </ul>
          <Outlet />
        </div>
      )}
    </div>
  );
}
