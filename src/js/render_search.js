import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { moviesApiService } from './render_popular';
import Pagination from './pagination';
import { renderFilmList, addFilmListToContainer } from './filmCard';
import { paginationChangeHandler, loadMoreChangeHandler, smoothScroll } from './render_utils';
import { addToStorage, getFromStorage } from './storage';

const searchFormRef = document.querySelector('#search-form');

const moviePaginationForSearch = new Pagination({
  initialPage: 1,
  total: 1,
  onChange(value) {
    handlePageChangeSearch(value);
    addToStorage('mainState', `"Search"`);
  },
});

searchFormRef.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  moviesApiService.query = e.currentTarget.elements.search.value;
  moviesApiService.page = 1;
  if (moviesApiService.query === '') {
    Notify.failure('Please type something');
    return;
  }
  renderSearch(moviesApiService.page, moviesApiService.query);
  smoothScroll();
  e.target.reset();
}

export function renderSearch(page, query) {
  if (page) {
    moviesApiService.page = page;
    moviePaginationForSearch.currentPage = page;
  } else {
    moviePaginationForSearch.currentPage = moviePaginationForSearch.currentPage;
  }
  if (query) {
    moviesApiService.query = query;
  }
}

async function handlePageChangeSearch(page) {
  if (page) {
    moviesApiService.page = page;
  }
  Loading.hourglass();

  const movies = await moviesApiService.getFilmsByName();

  const { results, total_pages } = movies;
  renderFilmList(results);
  moviePaginationForSearch.renderPaginationDisabled(
    document.querySelector('.pagination-list'),
    total_pages,
    moviesApiService.page,
  );
  moviePaginationForSearch.renderPaginationLoadMore(
    document.querySelector('.pagination'),
    moviesApiService.page,
    getFromStorage('language'),
  );
  paginationChangeHandler(onPaginationSearchHandler);
  loadMoreChangeHandler(onLoadMoreSearchHandler);
  Loading.remove();
}

async function onLoadMoreSearchHandler(event) {
  moviesApiService.page += 1;

  Loading.hourglass();

  const movies = await moviesApiService.getFilmsByName();

  const { results, total_pages } = movies;

  addFilmListToContainer(results);
  moviePaginationForSearch.renderPaginationDisabled(
    document.querySelector('.pagination-list'),
    total_pages,
    moviesApiService.page,
  );
  moviePaginationForSearch.renderPaginationLoadMore(
    document.querySelector('.pagination'),
    moviesApiService.page,
    getFromStorage('language'),
  );
  loadMoreChangeHandler(onLoadMoreSearchHandler);

  for (let i = 0; i < document.querySelector('.pagination-list').childNodes.length; i += 1) {
    const number = parseInt(
      document.querySelector('.pagination-list').childNodes[i].firstChild.textContent,
    );
    if (number >= moviePaginationForSearch.currentPage && number <= moviesApiService.page) {
      if (document.querySelector('.pagination-list').childNodes[i].classList.contains('active')) {
        document.querySelector('.pagination-list').childNodes[i].classList.remove('active');
      }
      document.querySelector('.pagination-list').childNodes[i].classList.add('loaded');
    }
  }
  Loading.remove();
}

function onPaginationSearchHandler(event) {
  if (
    (event.target.parentNode.classList.contains('pagination-prev') &&
      !event.target.parentNode.classList.contains('disabled')) ||
    (event.target.classList.contains('pagination-prev') &&
      !event.target.classList.contains('disabled'))
  ) {
    smoothScroll();
    moviePaginationForSearch.prevPage();
  }
  if (
    (event.target.parentNode.classList.contains('pagination-next') &&
      !event.target.parentNode.classList.contains('disabled')) ||
    (event.target.classList.contains('pagination-next') &&
      !event.target.classList.contains('disabled'))
  ) {
    smoothScroll();
    moviePaginationForSearch.nextPage();
  }
  if (
    event.target.parentNode.classList.contains('pagination-number') &&
    !event.target.parentNode.classList.contains('active')
  ) {
    smoothScroll();
    const clickPage = parseInt(event.target.textContent);
    moviePaginationForSearch.currentPage = clickPage;
  }
  if (
    event.target.classList.contains('pagination-number') &&
    !event.target.classList.contains('active')
  ) {
    smoothScroll();
    const clickPage = parseInt(event.target.childNodes[0].textContent);
    moviePaginationForSearch.currentPage = clickPage;
  }
}
