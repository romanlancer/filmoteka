import { refs } from './refs';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { moviesApiService } from './render_popular';
import { renderFilmList, addFilmListToContainer } from './filmCard';
import Pagination from './pagination';
import { paginationChangeHandler, loadMoreChangeHandler, smoothScroll } from './render_utils';
import { addToStorage, getFromStorage } from './storage';
refs.filterListGenres.addEventListener('change', onGenresFilter);
refs.filterListYears.addEventListener('change', onYearsFilter);
refs.filterListLanguages.addEventListener('change', onLanguagesFilter);
refs.filterListVoteAverage.addEventListener('change', onVotesFilter);

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

  Loading.hourglass({
    cssAnimationDuration: 400,
    svgSize: '150px',
    svgColor: '#ff6b01',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  });
  const movies = await moviesApiService.getFilteredMovies();

  const { results, total_pages } = movies;
  console.log(results);
  setTimeout(() => {
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
  }, 500);
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
  Loading.hourglass({
    cssAnimationDuration: 400,
    svgSize: '150px',
    svgColor: '#ff6b01',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  });
  const movies = await moviesApiService.getFilteredMovies();
  const { results, total_pages } = movies;
  setTimeout(() => {
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
  }, 500);
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
  moviesApiService.getFilteredMovies().then(({ results }) => {
    renderFilmList(results);
  });
}

function onLanguagesFilter(e) {
  let language = e.target.value;
  moviesApiService.originalLanguage = language;
  moviesApiService.getFilteredMovies().then(({ results }) => {
    renderFilmList(results);
  });
}

function onVotesFilter(e) {
  let vote = e.target.value;
  moviesApiService.vote = Number(vote);
  moviesApiService.getFilteredMovies().then(({ results }) => {
    renderFilmList(results);
  });
}
