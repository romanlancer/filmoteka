import MoviesApiService from './fetch_api';
import Pagination from './pagination';

const paginationListRef = document.querySelector('.pagination-list');

const moviesApiService = new MoviesApiService();
const moviePagination = new Pagination({
    parentElement : paginationListRef,
    initialPage: 1,
		total: 1,
		onChange(value) {
      console.log('page change');
      moviesApiService.page = value;
      moviesApiService.getPopularFilms().then(({page, results, total_pages }) => {
        console.log(`current page ${page}`);
        moviePagination.renderPagination(total_pages);
        });
		},
});

moviePagination.currentPage = 1;

