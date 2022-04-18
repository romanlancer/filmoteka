import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { moviesApiService } from './render_popular';
import Pagination from './pagination';
import {
  renderFilmList,
  addFilmListToContainer,
  clearContainer
} from './filmCard';
import {
  paginationChangeHandler,
  loadMoreChangeHandler,
  smoothScroll,
  addImgNodata,
  removeImgNodata
} from './render_utils';
import { addToStorage, getFromStorage } from './storage';
import debounce from 'debounce';

let currentPageWatched = 1;
let currentPageQueue = 1;
let cardsPerPage = 1;

if (window.matchMedia('(min-width: 320px)').matches) {
  cardsPerPage = 4;
}
if (window.matchMedia('(min-width: 768px)').matches) {
  cardsPerPage = 8;
}
if (window.matchMedia('(min-width: 1024px)').matches) {
  cardsPerPage = 9;
}

window.addEventListener('resize', debounce(resizeWindowHandler, 100));

function resizeWindowHandler(event) {
  const windowWidth = window.innerWidth;
  if (windowWidth < 768) {
    cardsPerPage = 4;
  }
  if (windowWidth >= 768 && windowWidth < 1024) {
    cardsPerPage = 8;
  }
  if (windowWidth >= 1024) {
    cardsPerPage = 9;
  }
  if (getFromStorage('mainState') === 'Library') {
    if (getFromStorage('libraryState') === 'Watched') renderWatched();
    if (getFromStorage('libraryState') === 'Queue') renderQueue();
  }
}

const moviePaginationForWatched = new Pagination({
  initialPage: 1,
  total: 1,
  onChange(value) {
    handlePageChangeWatched(value, cardsPerPage);
    addToStorage('mainState', `"Library"`);
    addToStorage('libraryState', `"Watched"`);
  },
});

const moviePaginationForQueue = new Pagination({
  initialPage: 1,
  total: 1,
  onChange(value) {
    handlePageChangeQueue(value, cardsPerPage);
    addToStorage('mainState', `"Library"`);
    addToStorage('libraryState', `"Queue"`);
  },
});

export function renderWatched(page) {
  smoothScroll();
  if (page) moviePaginationForWatched.currentPage = page;
  else moviePaginationForWatched.currentPage = currentPageWatched;
}

export function renderQueue(page) {
  smoothScroll();
  if (page) moviePaginationForQueue.currentPage = page;
  else moviePaginationForQueue.currentPage = currentPageQueue;
}

async function handlePageChangeWatched(page, elPerPage) {
  currentPageWatched = page;
  const watchedFilms = getFromStorage('dataFilmsByWatched') === null ?
    [] :
    getFromStorage('dataFilmsByWatched');

  if (watchedFilms.length === 0) {
    clearContainer();
    moviePaginationForWatched.paginationClear(document.querySelector('.pagination-list'));
    removeImgNodata();
    addImgNodata();
    return
  }
  Loading.hourglass();
  const totalPages = Math.ceil(watchedFilms.length / elPerPage);
  moviePaginationForWatched.total = totalPages;
  const FilmsIdForRender = watchedFilms.slice((page - 1) * elPerPage, page * elPerPage);

  if (FilmsIdForRender.length === 0) {
      moviePaginationForWatched.currentPage -= 1;
      return
    }

  const arrayOfPromises = FilmsIdForRender.map(async id => {
    const response = await moviesApiService.getFilmDetails(id);
    return response;
  });
  const FilmsForRender = await Promise.all(arrayOfPromises);
    
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
  Loading.remove();
}

async function onLoadMoreWatchedHandler(event) {
  currentPageWatched += 1;

  const watchedFilms =
    getFromStorage('dataFilmsByWatched') === null ?
      [] :
      getFromStorage('dataFilmsByWatched');
  

  const totalPages = Math.ceil(watchedFilms.length / cardsPerPage);
  const FilmsIdForRender = watchedFilms.slice(
    (currentPageWatched - 1) * cardsPerPage,
    currentPageWatched * cardsPerPage,
  );
  Loading.hourglass();
  const arrayOfPromises = FilmsIdForRender.map(async id => {
    const response = await moviesApiService.getFilmDetails(id);
    return response;
  });
  const FilmsForRender = await Promise.all(arrayOfPromises);

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
  Loading.remove();
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

async function handlePageChangeQueue(page, elPerPage) {
  currentPageQueue = page;

  const watchedFilms = getFromStorage('dataFilmsByQueue') === null ?
    [] :
    getFromStorage('dataFilmsByQueue');

  if (watchedFilms.length === 0) {
    clearContainer();
    moviePaginationForQueue.paginationClear(document.querySelector('.pagination-list'));
    removeImgNodata();
    addImgNodata();
    return
  }
  Loading.hourglass();
  const totalPages = Math.ceil(watchedFilms.length / elPerPage);
  moviePaginationForQueue.total = totalPages;
  const FilmsIdForRender = watchedFilms.slice(
    (currentPageQueue - 1) * elPerPage,
    currentPageQueue * elPerPage,
  );

  if (FilmsIdForRender.length === 0) {
    moviePaginationForQueue.currentPage -= 1;
    return
  }

  const arrayOfPromises = FilmsIdForRender.map(async id => {
    const response = await moviesApiService.getFilmDetails(id);
    return response;
  });
  const FilmsForRender = await Promise.all(arrayOfPromises);

  renderFilmList(FilmsForRender);
  moviePaginationForQueue.renderPaginationDisabled(
    document.querySelector('.pagination-list'),
    totalPages,
    page,
  );
  moviePaginationForQueue.renderPaginationLoadMore(
    document.querySelector('.pagination'),
    page,
    getFromStorage('language'),
  );
  paginationChangeHandler(onPaginationQueueHandler);
  loadMoreChangeHandler(onLoadMoreQueueHandler);
  Loading.remove();
}

async function onLoadMoreQueueHandler(event) {
  currentPageQueue += 1;

  const watchedFilms =
    getFromStorage('dataFilmsByQueue') === null ? [] : getFromStorage('dataFilmsByQueue');
  
  const totalPages = Math.ceil(watchedFilms.length / cardsPerPage);
  const FilmsIdForRender = watchedFilms.slice(
    (currentPageQueue - 1) * cardsPerPage,
    currentPageQueue * cardsPerPage,
  );
  Loading.hourglass();
  const arrayOfPromises = FilmsIdForRender.map(async id => {
    const response = await moviesApiService.getFilmDetails(id);
    return response;
  });
  const FilmsForRender = await Promise.all(arrayOfPromises);

  addFilmListToContainer(FilmsForRender);
  moviePaginationForQueue.renderPaginationDisabled(
    document.querySelector('.pagination-list'),
    totalPages,
    currentPageQueue,
  );
  moviePaginationForQueue.renderPaginationLoadMore(
    document.querySelector('.pagination'),
    currentPageQueue,
    getFromStorage('language'),
  );
  loadMoreChangeHandler(onLoadMoreQueueHandler);

  for (let i = 0; i < document.querySelector('.pagination-list').childNodes.length; i += 1) {
    const number = parseInt(
      document.querySelector('.pagination-list').childNodes[i].firstChild.textContent,
    );
    if (number >= moviePaginationForQueue.currentPage && number <= currentPageQueue) {
      if (document.querySelector('.pagination-list').childNodes[i].classList.contains('active')) {
        document.querySelector('.pagination-list').childNodes[i].classList.remove('active');
      }
      document.querySelector('.pagination-list').childNodes[i].classList.add('loaded');
    }
  }
  Loading.remove();
}

function onPaginationQueueHandler(event) {
  smoothScroll();
  if (
    event.target.parentNode.classList.contains('pagination-prev') ||
    event.target.classList.contains('pagination-prev')
  ) {
    moviePaginationForQueue.prevPage();
  }
  if (
    event.target.parentNode.classList.contains('pagination-next') ||
    event.target.classList.contains('pagination-next')
  ) {
    moviePaginationForQueue.nextPage();
  }
  if (
    event.target.parentNode.classList.contains('pagination-number') &&
    !event.target.parentNode.classList.contains('active')
  ) {
    const clickPage = parseInt(event.target.textContent);
    moviePaginationForQueue.currentPage = clickPage;
  }
  if (
    event.target.classList.contains('pagination-number') &&
    !event.target.classList.contains('active')
  ) {
    const clickPage = parseInt(event.target.childNodes[0].textContent);
    moviePaginationForQueue.currentPage = clickPage;
  }
}
