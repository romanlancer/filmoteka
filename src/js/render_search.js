import { Loading } from 'notiflix/build/notiflix-loading-aio';
import MoviesApiService from './fetch_api';
import Pagination from './pagination';
import { renderFilmList } from './filmCard';
import { eventListenerChangeHandler } from './pagination';

const searchFormRef = document.querySelector('#search-form');
const moviesApiService = new MoviesApiService();

const moviePaginationForSearch = new Pagination({
  initialPage: 1,
  total: 1,
  onChange(value) {
    // console.log('change page search');
    
    renderSearch(value);
  },
});

searchFormRef.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  moviesApiService.query = e.currentTarget.elements.search.value;

  if (moviesApiService.query === '') {
    return Notiflix.Notify.failure('Please type something');
  }
  renderSearch();
}

export async function renderSearch(page, query) {
  if (page) {
      moviesApiService.page = page;
  }
  if (query) {
      moviesApiService.query = query;
    }
    
    Loading.hourglass({
    cssAnimationDuration: 400,
    svgSize: '150px',
    svgColor: '#ff6b01',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  });

  const movies = await moviesApiService.getFilmsByName();

  const { results, total_pages } = movies;
  setTimeout(() => {
    renderFilmList(results);
    eventListenerChangeHandler(onPaginationSearchHandler);
    moviePaginationForSearch.renderPagination(document.querySelector('.pagination-list'), total_pages);
    Loading.remove();
  }, 500);
}

function onPaginationSearchHandler(event) {
  if (
    event.target.parentNode.classList.contains('pagination-prev') ||
    event.target.classList.contains('pagination-prev')
  ) {
    moviePaginationForSearch.prevPage();
  }
  if (
    event.target.parentNode.classList.contains('pagination-next') ||
    event.target.classList.contains('pagination-next')
  ) {
    moviePaginationForSearch.nextPage();
  }
  if (
    event.target.parentNode.classList.contains('pagination-number') &&
    !event.target.parentNode.classList.contains('active')
  ) {
    const clickPage = parseInt(event.target.textContent);
    moviePaginationForSearch.currentPage = clickPage;
  }
  if (
    event.target.classList.contains('pagination-number') &&
    !event.target.classList.contains('active')
  ) {
    const clickPage = parseInt(event.target.childNodes[0].textContent);
    moviePaginationForSearch.currentPage = clickPage;
  }
}

