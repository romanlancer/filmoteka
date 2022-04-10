import { Loading } from 'notiflix/build/notiflix-loading-aio';
import MoviesApiService from './fetch_api';
import Pagination from './pagination';
import { renderFilmList } from './filmCard';
const containerEl = document.querySelector('.cards__list');
const paginationListRef = document.querySelector('.pagination-list');
const searchFormRef = document.querySelector('#search-form');
const moviesApiService = new MoviesApiService();

const moviePaginationForSearch = new Pagination({
  parentElement: paginationListRef,
  initialPage: 1,
  total: 1,
  onChange(value) {
    moviesApiService.page = value;
  },
});

searchFormRef.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();
  moviesApiService.query = e.currentTarget.elements.search.value;

  if (moviesApiService.query === '') {
    return Notiflix.Notify.failure('Please type something');
  }
  clearMoviesContainer();

  Loading.hourglass({
    cssAnimationDuration: 400,
    svgSize: '150px',
    svgColor: '#ff6b01',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  });

  const movies = await moviesApiService.getFilmsByName();

  const { results, total_pages } = movies;
  console.log(results);
  console.log(total_pages);
  setTimeout(() => {
    renderFilmList(results);
    Loading.remove();
  }, 500);
  moviePaginationForSearch.currentPage = 1;
  moviePaginationForSearch.renderPagination(total_pages);
}

function clearMoviesContainer() {
  containerEl.innerHTML = '';
}
