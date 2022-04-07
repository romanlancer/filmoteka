import { onLibrary } from './library';
import MoviesApiService from './fetch_api';

const moviesApiService = new MoviesApiService();

const refs = {
  header: document.querySelector('#header'),
};

onHome();

export function onHome() {
  renderPageHome();

  refs.header.addEventListener('click', onClickBtn);

  moviesApiService.getPopularFilms().then(({ results }) => {
    console.log(results);
  });
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
  };

  refs.home.classList.remove('header__library');
  refs.btnLibrary.classList.remove('navigation__button--current');
  refs.btnHome.classList.add('navigation__button--current');
  refs.search.style.display = 'flex';
  refs.btnLibraryHero.style.display = 'none';
}
