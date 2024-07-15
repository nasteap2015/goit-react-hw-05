import axios from "axios";


const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

const options = {
  headers: {
	// Замість api_read_access_token вставте свій токен
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjgzNTNiMzRlNDZjZjhjOGJlMDMzZDg5ZTE5ZTM1MSIsIm5iZiI6MTcyMDk1NjYwMC44ODIwNDMsInN1YiI6IjY2OTI3NzViYzM4ZGUyNDcxZTVlOGY1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rNtRRWYOGiFC6R3gGmTkO_wpz6GIwYScmwB6OdKJWQs'
  }
};

export const fetchTrendingMovies = async () => {
    const response = await axios.get(url, options);
    console.log('Відповідь: ', response.data.results);
    return response.data;
}
