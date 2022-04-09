import MoviesApiService from './fetch_api';
import Pagination from './pagination';

const paginationListRef = document.querySelector('.pagination-list');

const moviesApiService = new MoviesApiService();
const moviePagination = new Pagination({
  parentElement: paginationListRef,
  initialPage: 1,
  total: 1,
  onChange(value) {
    moviesApiService.page = value;
    moviesApiService.getPopularFilms().then(({ page, results, total_pages }) => {
      moviePagination.renderPagination(total_pages);
    });
  },
});

moviePagination.currentPage = 1;
