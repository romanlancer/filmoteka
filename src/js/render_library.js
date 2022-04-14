import { Loading } from 'notiflix/build/notiflix-loading-aio';
import MoviesApiService from './fetch_api';
import Pagination from './pagination';
import { renderFilmList, addFilmListToContainer } from './filmCard';
import { paginationChangeHandler, loadMoreChangeHandler, smoothScroll } from './pagination';
import { getFromStorage } from './storage';

let watchedFilms = [];
let currentPageWatched = 1;
let currentPageQueue = 1;
const cardsPerPage = 3;

const moviePaginationForWatched = new Pagination({
  initialPage: 1,
  total: 1,
  onChange(value) {
    handlePageChangeWatched(value, cardsPerPage, watchedFilms);
  },
});

const moviePaginationForQueue = new Pagination({
  initialPage: 1,
  total: 1,
  onChange(value) {
    handlePageChangeQueue(value, cardsPerPage, []);
  },
});

watchedFilms = getFromStorage('dataFilmsByWatched');

if (!watchedFilms) watchedFilms = [];

watchedFilms.forEach((data) => {
  data.genre_ids = data.genres.map((data) => {
    return data.id;
  })
});

export function renderWatched(page) {
  if(page) moviePaginationForWatched.currentPage = page;
  else moviePaginationForWatched.currentPage = currentPageWatched;
    
} 

export function renderQueue(page) {
  if(page) moviePaginationForQueue.currentPage = page;
  else moviePaginationForQueue.currentPage = currentPageQueue;
} 



function handlePageChangeWatched(page, elPerPage, arrFilms) {
  currentPageWatched = page;
  const totalPages = Math.ceil(arrFilms.length / elPerPage);
  moviePaginationForWatched.total = totalPages;

  const FilmsForRender = arrFilms.slice((page - 1) * elPerPage, page * elPerPage);

  renderFilmList(FilmsForRender);
  moviePaginationForWatched.renderPaginationDisabled(
      document.querySelector('.pagination-list'),
      totalPages,
      page,
  );
  moviePaginationForWatched.renderPaginationLoadMore(
      document.querySelector('.pagination'),
      page,
      getFromStorage('language'),
    );
  paginationChangeHandler(onPaginationWatchedHandler);
  loadMoreChangeHandler(onLoadMoreWatchedHandler);
}

function onLoadMoreWatchedHandler(event) {
  currentPageWatched += 1;
  const totalPages = Math.ceil(watchedFilms.length / cardsPerPage);

  const FilmsForRender = watchedFilms.slice((currentPageWatched - 1) * cardsPerPage, currentPageWatched * cardsPerPage);

  addFilmListToContainer(FilmsForRender);
  moviePaginationForWatched.renderPaginationDisabled(
      document.querySelector('.pagination-list'),
      totalPages,
      currentPageWatched,
  );
  moviePaginationForWatched.renderPaginationLoadMore(
      document.querySelector('.pagination'),
      currentPageWatched,
      getFromStorage('language'),
    );
  loadMoreChangeHandler(onLoadMoreWatchedHandler);

  for (let i = 0; i < document.querySelector('.pagination-list').childNodes.length; i += 1) {
      const number = parseInt(
        document.querySelector('.pagination-list').childNodes[i].firstChild.textContent,
      );
      if (number >= moviePaginationForWatched.currentPage && number <= currentPageWatched) {
        if (document.querySelector('.pagination-list').childNodes[i].classList.contains('active')) {
          document.querySelector('.pagination-list').childNodes[i].classList.remove('active');
        }
        document.querySelector('.pagination-list').childNodes[i].classList.add('loaded');
      }
    }
}

function onPaginationWatchedHandler(event) {
 smoothScroll();
  if (
    event.target.parentNode.classList.contains('pagination-prev') ||
    event.target.classList.contains('pagination-prev')
  ) {
    moviePaginationForWatched.prevPage();
  }
  if (
    event.target.parentNode.classList.contains('pagination-next') ||
    event.target.classList.contains('pagination-next')
  ) {
    moviePaginationForWatched.nextPage();
  }
  if (
    event.target.parentNode.classList.contains('pagination-number') &&
    !event.target.parentNode.classList.contains('active')
  ) {
    const clickPage = parseInt(event.target.textContent);
    moviePaginationForWatched.currentPage = clickPage;
  }
  if (
    event.target.classList.contains('pagination-number') &&
    !event.target.classList.contains('active')
  ) {
    const clickPage = parseInt(event.target.childNodes[0].textContent);
    moviePaginationForWatched.currentPage = clickPage;
  }
}


function handlePageChangeQueue(page, elPerPage, arrFilms) {
   currentPageQueue = page;
  const totalPages = Math.ceil(arrFilms.length / elPerPage);
  moviePaginationForQueue.total = totalPages;

  const FilmsForRender = arrFilms.slice((page - 1) * elPerPage, page * elPerPage);

  renderFilmList(FilmsForRender);
  moviePaginationForWatched.renderPaginationDisabled(
      document.querySelector('.pagination-list'),
      totalPages,
      page,
  );
  moviePaginationForWatched.renderPaginationLoadMore(
      document.querySelector('.pagination'),
      page,
      getFromStorage('language'),
    );
  // paginationChangeHandler(onPaginationWatchedHandler);
  // loadMoreChangeHandler(onLoadMoreWatchedHandler);
}