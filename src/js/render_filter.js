import { addImgNodata, removeImgNodata } from './render_utils';
import { refs } from './refs';
import { renderPopular } from './render_popular';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { moviesApiService } from './render_popular';
import { renderFilmList, addFilmListToContainer, clearContainer } from './filmCard';
import Pagination from './pagination';
import { paginationChangeHandler, loadMoreChangeHandler, smoothScroll } from './render_utils';
import { addToStorage, getFromStorage } from './storage';

refs.filterListGenres.addEventListener('change', onGenresFilter);
refs.filterListYears.addEventListener('change', onYearsFilter);
refs.filterListLanguages.addEventListener('change', onLanguagesFilter);
refs.filterListVoteAverage.addEventListener('change', onVotesFilter);
refs.filterButtonOpen.addEventListener('click', onFilterOpen);
// refs.filterContainer.addEventListener('click', onBackdropclick);
refs.settingsButton.addEventListener('click', onSettingsClick);
refs.filterResetButton.addEventListener('click', onFilterResetButton);

function onFilterResetButton() {
  renderPopular();
}

function onSettingsClick() {
  refs.settingsButton.classList.toggle('filter-icon__animation');
  refs.filterButtonOpen.classList.remove('filter-icon__animation');
  refs.settingsContainer.classList.toggle('is-hidden');
  refs.filterContainer.classList.add('is-hidden');
  refs.filterButtonOpen.classList.remove('is-hidden');
}

function onFilterOpen(e) {
  refs.settingsButton.classList.remove('filter-icon__animation');
  refs.filterButtonOpen.classList.toggle('filter-icon__animation');
  refs.settingsContainer.classList.add('is-hidden');
  refs.filterContainer.classList.toggle('is-hidden');
}

const moviePaginationForFilter = new Pagination({
  initialPage: 1,
  total: 1,
  onChange(value) {
    handlePageChangeFilter(value);
    addToStorage('mainState', `"Filter"`);
  },
});

async function handlePageChangeFilter(page) {
  if (page) {
    moviesApiService.page = page;
  }

  Loading.hourglass();
  const movies = await moviesApiService.getFilteredMovies();
  const { results, total_pages } = movies;
  console.log(movies);
  if (results.length === 0) {
    clearContainer();
    moviePaginationForFilter.paginationClear(document.querySelector('.pagination-list'));
    removeImgNodata();
    addImgNodata();
    Loading.remove();
    return;
  }

  renderFilmList(results);
  moviePaginationForFilter.renderPaginationDisabled(
    document.querySelector('.pagination-list'),
    total_pages,
    moviesApiService.page,
  );
  moviePaginationForFilter.renderPaginationLoadMore(
    document.querySelector('.pagination'),
    moviesApiService.page,
    getFromStorage('language'),
  );
  paginationChangeHandler(onPaginationFilterHandler);
  loadMoreChangeHandler(onLoadMoreFilterHandler);
  Loading.remove();
}

export function renderFilter(page) {
  if (page) {
    moviePaginationForFilter.currentPage = page;
  } else {
    moviePaginationForFilter.currentPage = moviesApiService.page;
  }
}

async function onLoadMoreFilterHandler(event) {
  moviesApiService.page += 1;
  Loading.hourglass();
  const movies = await moviesApiService.getFilteredMovies();
  const { results, total_pages } = movies;
  addFilmListToContainer(results);
  moviePaginationForFilter.renderPaginationDisabled(
    document.querySelector('.pagination-list'),
    total_pages,
    moviesApiService.page,
  );
  moviePaginationForFilter.renderPaginationLoadMore(
    document.querySelector('.pagination'),
    moviesApiService.page,
    getFromStorage('language'),
  );
  loadMoreChangeHandler(onLoadMoreFilterHandler);

  for (let i = 0; i < document.querySelector('.pagination-list').childNodes.length; i += 1) {
    const number = parseInt(
      document.querySelector('.pagination-list').childNodes[i].firstChild.textContent,
    );
    if (number >= moviePaginationForFilter.currentPage && number <= moviesApiService.page) {
      if (document.querySelector('.pagination-list').childNodes[i].classList.contains('active')) {
        document.querySelector('.pagination-list').childNodes[i].classList.remove('active');
      }
      document.querySelector('.pagination-list').childNodes[i].classList.add('loaded');
    }
  }
  Loading.remove();
}

function onPaginationFilterHandler(event) {
  if (
    (event.target.parentNode.classList.contains('pagination-prev') &&
      !event.target.parentNode.classList.contains('disabled')) ||
    (event.target.classList.contains('pagination-prev') &&
      !event.target.classList.contains('disabled'))
  ) {
    smoothScroll();
    moviePaginationForFilter.prevPage();
  }
  if (
    (event.target.parentNode.classList.contains('pagination-next') &&
      !event.target.parentNode.classList.contains('disabled')) ||
    (event.target.classList.contains('pagination-next') &&
      !event.target.classList.contains('disabled'))
  ) {
    smoothScroll();
    moviePaginationForFilter.nextPage();
  }
  if (
    event.target.parentNode.classList.contains('pagination-number') &&
    !event.target.parentNode.classList.contains('active')
  ) {
    smoothScroll();
    const clickPage = parseInt(event.target.textContent);
    moviePaginationForFilter.currentPage = clickPage;
  }
  if (
    event.target.classList.contains('pagination-number') &&
    !event.target.classList.contains('active')
  ) {
    smoothScroll();
    const clickPage = parseInt(event.target.childNodes[0].textContent);
    moviePaginationForFilter.currentPage = clickPage;
  }
}

let startYear = 1907;
let endYear = new Date().getFullYear();
const yearsList = () => {
  let str = `<option value="" selected>All Years</option>`;
  for (let i = endYear; i >= startYear; i -= 1) {
    str += `<option value="${i}">${i}</option>`;
  }
  return str;
};

refs.filterListYears.innerHTML = yearsList();

function onGenresFilter(e) {
  let genre = e.target.value;
  moviesApiService.genre = Number(genre);
  renderFilter();
}

function onYearsFilter(e) {
  let year = e.target.value;
  moviesApiService.year = Number(year);
  renderFilter();
}

function onLanguagesFilter(e) {
  let language = e.target.value;
  moviesApiService.originalLanguage = language;
  renderFilter();
}

function onVotesFilter(e) {
  let vote = e.target.value;
  moviesApiService.vote = Number(vote);
  renderFilter();
}
