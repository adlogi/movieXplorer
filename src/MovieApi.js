export default class MovieApi {
  static TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
  static PROFILE_BASE_URL = 'http://image.tmdb.org/t/p/w185';
  static TRAILER_BASE_URL = 'https://www.youtube.com/embed/';
  static API_KEY = '542003918769df50083a13c415bbc602';

  // Possible values for <<param>>: latest, now_playing, popular, top_rated, upcoming
  // Description: https://developers.themoviedb.org/3/movies/get-latest-movie
  // Format: https://api.themoviedb.org/3/movie/latest?api_key=<<api_key>>&language=en-US
  static getMoviesListUrl = (param, page = 1) =>
    `${MovieApi.TMDB_BASE_URL}/movie/${param}?api_key=${MovieApi.API_KEY}&language=en-US&page=${page}`;

  // Description: https://developers.themoviedb.org/3/search/search-movies
  // Format: https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
  static getSearchMoviesUrl(keywords, page = 1) {
    return `${MovieApi.TMDB_BASE_URL}/search/movie?api_key=${MovieApi.API_KEY}&language=en-US&query=${keywords}&page=${page}&include_adult=false`;
  }

  // Description: https://developers.themoviedb.org/3/movies/get-movie-details
  // Format: https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
  static getMovieDetailsUrl(movieId) {
    return `${MovieApi.TMDB_BASE_URL}/movie/${movieId}?api_key=${MovieApi.API_KEY}&language=en-US`;
  }

  // Description: https://developers.themoviedb.org/3/movies/get-movie-videos
  // Format: https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US
  static getMovieVideosUrl(movieId) {
    return `${MovieApi.TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${MovieApi.API_KEY}&language=en-US`;
  }

  // Description: https://developers.themoviedb.org/3/movies/get-movie-credits
  // Format: https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>
  static getMovieCreditsUrl(movieId) {
    return `${MovieApi.TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${MovieApi.API_KEY}`;
  }

  // Description: https://developers.themoviedb.org/3/people/get-person-details
  // Format: https://api.themoviedb.org/3/person/{person_id}?api_key=<<api_key>>&language=en-US
  static getPersonDetailsUrl(personId) {
    return `${MovieApi.TMDB_BASE_URL}/person/${personId}?api_key=${MovieApi.API_KEY}&language=en-US`;
  }
}