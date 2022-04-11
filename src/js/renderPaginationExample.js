import { MoviesApiService } from './render_popular';
import Pagination from './pagination';

const paginationListRef = document.querySelector('.pagination-list');

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
