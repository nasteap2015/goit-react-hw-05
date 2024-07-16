import axios from "axios";


const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjgzNTNiMzRlNDZjZjhjOGJlMDMzZDg5ZTE5ZTM1MSIsIm5iZiI6MTcyMDk1NjYwMC44ODIwNDMsInN1YiI6IjY2OTI3NzViYzM4ZGUyNDcxZTVlOGY1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rNtRRWYOGiFC6R3gGmTkO_wpz6GIwYScmwB6OdKJWQs'
  }
};

export const fetchTrendingMovies = async () => {
    const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', options);
    return response.data;
}

export async function fetchMovieDetails(movieId) {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, options);
  return response.data;
  
}

export const fetchMovieCast = async (movieId) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, options);
    return response.data.cast;
}

export const fetchMovieReview = async (movieId) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, options);
    return response.data.results;
}

export const fetchMoviesByQuery = async (query) => {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}`, options);
    return response.data.results;
}

