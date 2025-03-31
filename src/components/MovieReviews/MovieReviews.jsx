import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchMovieReviews } from "../../moviesService";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieReviews.module.css"

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch {
        setError(true);
        toast.error("Please reload there was an error!!!!");
      } finally {
        setIsLoading(false);
      }
    }
    getReviews();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {reviews.length > 0 ? (
        <ul className={css.list}>
          {reviews.map((review) => (
            <li key={review.id} className={css.item}>
              <div className={css.container}>
                <BsPersonCircle className={css.icon} />
                <p className={css.text}>{`Author: ${review.author}`}</p>
              </div>
              <p className={css.textContent}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.text}>No reviews yet</p>
      )}
    </>
  );
}
