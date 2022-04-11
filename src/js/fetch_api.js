import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const BASE_URL = 'https://api.themoviedb.org';
const API_KEY = 'e236468c654efffdf9704cd975a74a96';

export default class MoviesApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.lang = '';
  }

  async getPopularFilms() {
    try {
      const url = `${BASE_URL}/3/movie/popular?api_key=${API_KEY}&language=${this.lang}&page=${this.page}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      Notify.failure('Oops, an error occurred');
    }
  }

  async getTrendFilms() {
    try {
      const url = `${BASE_URL}/3/trending/movie/week?api_key=${API_KEY}&language=${this.lang}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      Notify.failure('Oops, an error occurred');
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
      Notify.failure('Oops, an error occurred');
    }
  }

  async getFilmDetails(id) {
    try {
      const url = `${BASE_URL}/3/movie/${id}?api_key=${API_KEY}&language=${this.lang}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      Notify.failure('Oops, an error occurred');
    }
  }

  async getFilmVideo(id) {
    try {
      const url = `${BASE_URL}/3/movie/${id}/videos?api_key=${API_KEY}&language=${this.lang}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      Notify.failure('Oops, an error occurred');
    }
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get query() {
    return this.searchQuery;
  }

  setLang(newLang) {
    this.lang = newLang;
  }

  getLang() {
    return this.lang;
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
