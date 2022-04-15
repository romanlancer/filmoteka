import { Loading } from 'notiflix/build/notiflix-loading-aio';
import MoviesApiService from './fetch_api';
import Pagination from './pagination';
import { renderFilmList, addFilmListToContainer } from './filmCard';
import { paginationChangeHandler, loadMoreChangeHandler, smoothScroll } from './render_utils';
import { addToStorage, getFromStorage } from './storage';

export const moviesApiService = new MoviesApiService();

const moviePaginationForPopular = new Pagination({
  initialPage: 1,
  total: 1,
  onChange(value) {
    handlePageChangePopular(value);
    addToStorage('mainState', `"Popular"`);
  },
});

export function renderPopular(page) {
  if (page) {
    moviePaginationForPopular.currentPage = page;
  } else {
    moviePaginationForPopular.currentPage = moviesApiService.page;
  }
}

async function handlePageChangePopular(page) {
  if (page) {
    moviesApiService.page = page;
  }

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
    moviePaginationForPopular.renderPaginationDisabled(
      document.querySelector('.pagination-list'),
      total_pages,
      moviesApiService.page,
    );
    moviePaginationForPopular.renderPaginationLoadMore(
      document.querySelector('.pagination'),
      moviesApiService.page,
      getFromStorage('language'),
    );
    paginationChangeHandler(onPaginationPopularHandler);
    loadMoreChangeHandler(onLoadMorePopularHandler);
    Loading.remove();
  }, 500);
}

async function onLoadMorePopularHandler(event) {
  moviesApiService.page += 1;
  Loading.hourglass({
    cssAnimationDuration: 400,
    svgSize: '150px',
    svgColor: '#ff6b01',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  });
  const movies = await moviesApiService.getPopularFilms();
  const { results, total_pages } = movies;
  setTimeout(() => {
    addFilmListToContainer(results);
    moviePaginationForPopular.renderPaginationDisabled(
      document.querySelector('.pagination-list'),
      total_pages,
      moviesApiService.page,
    );
    moviePaginationForPopular.renderPaginationLoadMore(
      document.querySelector('.pagination'),
      moviesApiService.page,
      getFromStorage('language'),
    );
    loadMoreChangeHandler(onLoadMorePopularHandler);

    for (let i = 0; i < document.querySelector('.pagination-list').childNodes.length; i += 1) {
      const number = parseInt(
        document.querySelector('.pagination-list').childNodes[i].firstChild.textContent,
      );
      if (number >= moviePaginationForPopular.currentPage && number <= moviesApiService.page) {
        if (document.querySelector('.pagination-list').childNodes[i].classList.contains('active')) {
          document.querySelector('.pagination-list').childNodes[i].classList.remove('active');
        }
        document.querySelector('.pagination-list').childNodes[i].classList.add('loaded');
      }
    }
    Loading.remove();
  }, 500);
}

function onPaginationPopularHandler(event) {
  smoothScroll();
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
