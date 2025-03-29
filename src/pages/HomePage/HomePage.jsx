import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { fetchMovies } from "../../moviesService";
import MovieList from "../../components/MovieList/MovieList"
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";


export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const data =  await fetchMovies();
        setMovies(data);

      } catch {
        setError(true);
        toast.error("Please reload there was an error!!!!");
      }
      finally {
        setIsLoading(false)
      }
    }
    getMovies();
  }, []);
  return (
    <div>
      <h1>Trending today</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
      {isLoading && <Loader />}
      {error && <ErrorMessage/>}
    </div>
  );
}