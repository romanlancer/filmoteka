import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org';
const API_KEY = 'e236468c654efffdf9704cd975a74a96';

export default class MoviesApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  async getPopularFilms() {
    try {
      const url = `${BASE_URL}/3/movie/popular?api_key=${API_KEY}&page=${this.page}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getTrendFilms() {
    try {
      const url = `${BASE_URL}/3/trending/movie/week?api_key=${API_KEY}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getFilmsByName() {
    try {
      const searchParams = new URLSearchParams({
        api_key: 'e236468c654efffdf9704cd975a74a96',
        query: this.searchQuery,
        language: 'en-US',
        page: this.page,
        include_adult: true,
      });
      const url = `${BASE_URL}/3/search/movie?${searchParams}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getFilmDetails(id) {
    try {
      const url = `${BASE_URL}/3/movie/${id}?api_key=${API_KEY}`;
      const response = await axios.get(url);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getFilmVideo(id) {
    try {
      const url = `${BASE_URL}/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
      const response = await axios.get(url);
      return response;
    } catch (error) {
      return error;
    }
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get query() {
    return this.searchQuery;
  }

  incrementPage() {
    this.page += 1;
  }
  decrementPage() {
    this.page -= 1;
  }
  resetPage() {
    this.page = 1;
  }
}
