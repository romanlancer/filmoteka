import { Loading } from 'notiflix/build/notiflix-loading-aio';
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
  if (page) moviePaginationForWatched.currentPage = page;
  else moviePaginationForWatched.currentPage = currentPageWatched;
}

export function renderQueue(page) {
  if (page) moviePaginationForQueue.currentPage = page;
  else moviePaginationForQueue.currentPage = currentPageQueue;
}

function handlePageChangeWatched(page, elPerPage) {
  currentPageWatched = page;
  const watchedFilms = getFromStorage('dataFilmsByWatched') === null ? [] : getFromStorage('dataFilmsByWatched');

  // watchedFilms.forEach((data) => {
  //   data.genre_ids = data.genres.map((data) => {
  //     return data.id;
  //   })
  // });

  if (watchedFilms.length === 0) {
    clearContainer();
    moviePaginationForWatched.paginationClear(document.querySelector('.pagination-list'));
    removeImgNodata();
    addImgNodata();
    return
  }

  const totalPages = Math.ceil(watchedFilms.length / elPerPage);
  moviePaginationForWatched.total = totalPages;
  const FilmsForRender = watchedFilms.slice((page - 1) * elPerPage, page * elPerPage);

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

  const watchedFilms =
    getFromStorage('dataFilmsByWatched') === null ? [] : getFromStorage('dataFilmsByWatched');
  watchedFilms.forEach(data => {
    data.genre_ids = data.genres.map(data => {
      return data.id;
    });
  });
  const totalPages = Math.ceil(watchedFilms.length / cardsPerPage);
  const FilmsForRender = watchedFilms.slice(
    (currentPageWatched - 1) * cardsPerPage,
    currentPageWatched * cardsPerPage,
  );

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

function handlePageChangeQueue(page, elPerPage) {
  currentPageQueue = page;

  const watchedFilms =
    getFromStorage('dataFilmsByQueue') === null ? [] : getFromStorage('dataFilmsByQueue');
  watchedFilms.forEach(data => {
    data.genre_ids = data.genres.map(data => {
      return data.id;
    });
  });

  if (watchedFilms.length === 0) {
    const img = createElement(
      'div',
      {
        class: `${getFromStorage('theme') === 'dark' ? 'nodata-image dark' : 'nodata-image light'}`,
      },
      '',
    );
    clearContainer();
    moviePaginationForWatched.paginationClear(document.querySelector('.pagination-list'));
    if (document.querySelector('.cards__list').previousElementSibling)
      document.querySelector('.cards__list').previousElementSibling.remove();
    document.querySelector('.cards__list').before(img);
    return;
  }

  const totalPages = Math.ceil(watchedFilms.length / elPerPage);
  moviePaginationForQueue.total = totalPages;
  const FilmsForRender = watchedFilms.slice(
    (currentPageQueue - 1) * elPerPage,
    currentPageQueue * elPerPage,
  );

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
}

function onLoadMoreQueueHandler(event) {
  currentPageQueue += 1;

  const watchedFilms =
    getFromStorage('dataFilmsByQueue') === null ? [] : getFromStorage('dataFilmsByQueue');
  watchedFilms.forEach(data => {
    data.genre_ids = data.genres.map(data => {
      return data.id;
    });
  });
  const totalPages = Math.ceil(watchedFilms.length / cardsPerPage);
  const FilmsForRender = watchedFilms.slice(
    (currentPageQueue - 1) * cardsPerPage,
    currentPageQueue * cardsPerPage,
  );

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
