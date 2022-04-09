import { onLibrary } from './library';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import MoviesApiService from './fetch_api';
import Pagination from './pagination';
import { renderFilmList } from './filmCard';
const paginationListRef = document.querySelector('.pagination-list');
const moviesApiService = new MoviesApiService();

const moviePagination = new Pagination({
  parentElement: paginationListRef,
  initialPage: 1,
  total: 1,
  async onChange(value) {
    moviesApiService.page = value;
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
      Loading.remove();
    }, 500);

    moviePagination.renderPagination(total_pages);
  },
});

const refs = {
  header: document.querySelector('#header'),
};

export function onHome() {
  renderPageHome();
  refs.header.addEventListener('click', onClickBtn);
}
onHome();
moviePagination.currentPage = 1;
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
    moviePagination.currentPage = 1;
  }
}

function renderPageHome() {
  const refs = {
    home: document.querySelector('.header__home'),
    btnHome: document.querySelector('.navigation__button--home'),
    btnLibrary: document.querySelector('.navigation__button--library'),
    search: document.querySelector('#search-form'),
    btnLibraryHero: document.querySelector('.library__btn-list'),
  };

  refs.home.classList.remove('header__library');
  refs.btnLibrary.classList.remove('navigation__button--current');
  refs.btnHome.classList.add('navigation__button--current');
  refs.search.style.display = 'flex';
  refs.btnLibraryHero.style.display = 'none';
}
