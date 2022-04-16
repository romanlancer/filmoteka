import { refs } from './refs';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { moviesApiService } from './render_popular';
import { renderFilmList, addFilmListToContainer } from './filmCard';
import Pagination from './pagination';
import { paginationChangeHandler, loadMoreChangeHandler, smoothScroll } from './render_utils';
import { addToStorage, getFromStorage } from './storage';
import { onHome } from './home';
refs.filterListGenres.addEventListener('change', onGenresFilter);
refs.filterListYears.addEventListener('change', onYearsFilter);
refs.filterListLanguages.addEventListener('change', onLanguagesFilter);
refs.filterListVoteAverage.addEventListener('change', onVotesFilter);
refs.filterButtonOpen.addEventListener('click', onFilterOpen);
refs.filterButtonClose.addEventListener('click', onFilterClose);

function onFilterOpen(e) {
  refs.filterContainer.classList.remove('is-hidden');
  refs.filterButtonClose.classList.remove('is-hidden');
  refs.filterButtonOpen.classList.add('is-hidden');
}
function onFilterClose(e) {
  refs.filterContainer.classList.toggle('is-hidden');
  refs.filterButtonClose.classList.toggle('is-hidden');
  refs.filterButtonOpen.classList.toggle('is-hidden');
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

  if (total_pages === 0) {
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
  smoothScroll();
  if (
    event.target.parentNode.classList.contains('pagination-prev') ||
    event.target.classList.contains('pagination-prev')
  ) {
    moviePaginationForFilter.prevPage();
  }
  if (
    event.target.parentNode.classList.contains('pagination-next') ||
    event.target.classList.contains('pagination-next')
  ) {
    moviePaginationForFilter.nextPage();
  }
  if (
    event.target.parentNode.classList.contains('pagination-number') &&
    !event.target.parentNode.classList.contains('active')
  ) {
    const clickPage = parseInt(event.target.textContent);
    moviePaginationForFilter.currentPage = clickPage;
  }
  if (
    event.target.classList.contains('pagination-number') &&
    !event.target.classList.contains('active')
  ) {
    const clickPage = parseInt(event.target.childNodes[0].textContent);
    moviePaginationForFilter.currentPage = clickPage;
  }
}

let startYear = 1907;
let endYear = new Date().getFullYear();
const yearsList = () => {
  let str = `<option value="" selected>All Year</option>`;
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
