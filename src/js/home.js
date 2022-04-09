import { onLibrary } from './library';
import MoviesApiService from './fetch_api';
import Pagination from './pagination';
import { renderFilmList } from './filmCard';
const paginationListRef = document.querySelector('.pagination-list');
const moviesApiService = new MoviesApiService();

const moviePagination = new Pagination({
  parentElement: paginationListRef,
  initialPage: 1,
  total: 1,
  onChange(value) {
    console.log('page change');
    moviesApiService.page = value;
    moviesApiService.getPopularFilms().then(({ page, results, total_pages }) => {
      renderFilmList(results);
      moviePagination.renderPagination(total_pages);
    });
  },
});

const refs = {
  header: document.querySelector('#header'),
};

onHome();

export function onHome() {
  renderPageHome();

  refs.header.addEventListener('click', onClickBtn);
}

function onClickBtn() {
  const refs = {
    logo: document.querySelector('.header__logo--text'),
    home: document.querySelector('#button__home'),
    library: document.querySelector('#button__library'),
  };

  if (event.target === refs.library) {
    onLibrary();
  } else if (event.target === refs.home || event.target === refs.logo) {
    onHome();
  }
}

function renderPageHome() {
  const refs = {
    home: document.querySelector('.header__home'),
    btnHome: document.querySelector('.navigation__button--home'),
    btnLibrary: document.querySelector('.navigation__button--library'),
    search: document.querySelector('#search-form'),
    btnLibraryHero: document.querySelector('.library__btn-list'),
    header: document.querySelector('.header'),
  };

  refs.home.classList.remove('header__library');
  refs.btnLibrary.classList.remove('navigation__button--current');
  refs.btnHome.classList.add('navigation__button--current');
  refs.search.style.display = 'flex';
  refs.btnLibraryHero.style.display = 'none';
  refs.header.style.backgroundColor = '#000001';
}

moviesApiService.getPopularFilms().then(({ results }) => {
  renderFilmList(results);
});
