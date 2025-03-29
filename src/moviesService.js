import axios from "axios";

const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGU0OGVlZjZmMTcxMmUyZWZmNzQ4ZDc0ZmM2OTM4NSIsIm5iZiI6MTc0MzI0NTE4Ny44NTEsInN1YiI6IjY3ZTdjZjgzODcxNDVkZTMyZDYzN2YxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aWdlaUYM676wZKRCH4Xbe9TYbZIncoy_Ub6iFMHzW0I'
  }
};


export const fetchMovies = async () => {
  const resp = await axios.get('https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1', options);
  return resp.data.results;
}

export const fetchMovieById = async (movieId) => {
  const resp = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options);
  return resp.data;
}

export const fetchMovieCast = async (movieId) => {
  const resp = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options);
  return resp.data.cast;
}

export const fetchMovieReviews = async (movieId) => {
  const resp = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`, options);
  return resp.data.results;
}