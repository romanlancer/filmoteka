import { Loading } from 'notiflix/build/notiflix-loading-aio';
import MoviesApiService from './fetch_api';
import Pagination from './pagination';
import { renderFilmList } from './filmCard';
import { eventListenerChangeHandler } from './pagination';


const moviesApiService = new MoviesApiService();

const moviePaginationForPopular = new Pagination({
  initialPage: 1,
  total: 1,
  onChange(value) {
    // console.log('change page popular');
    renderPopular(value)
  },
});

export async function renderPopular(page = 1) {
    moviesApiService.page = page;
    Loading.hourglass({
      cssAnimationDuration: 400,
      svgSize: '150px',
      svgColor: '#ff6b01',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    });
    const movies = await moviesApiService.getPopularFilms();
    const { results, total_pages } = movies;
    setTimeout(() => {
      renderFilmList(results);
      eventListenerChangeHandler(onPaginationPopularHandler);
      moviePaginationForPopular.renderPagination(document.querySelector('.pagination-list'), total_pages);
      Loading.remove();
    }, 500);
}

function onPaginationPopularHandler(event) {
  if (
    event.target.parentNode.classList.contains('pagination-prev') ||
    event.target.classList.contains('pagination-prev')
  ) {
    moviePaginationForPopular.prevPage();
  }
  if (
    event.target.parentNode.classList.contains('pagination-next') ||
    event.target.classList.contains('pagination-next')
  ) {
    moviePaginationForPopular.nextPage();
  }
  if (
    event.target.parentNode.classList.contains('pagination-number') &&
    !event.target.parentNode.classList.contains('active')
  ) {
    const clickPage = parseInt(event.target.textContent);
    moviePaginationForPopular.currentPage = clickPage;
  }
  if (
    event.target.classList.contains('pagination-number') &&
    !event.target.classList.contains('active')
  ) {
    const clickPage = parseInt(event.target.childNodes[0].textContent);
    moviePaginationForPopular.currentPage = clickPage;
  }
}