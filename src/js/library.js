import { onHome } from './home';
import { renderWatched, renderQueue } from './render_library';

const refs = {
  header: document.querySelector('#header'),
};

export function onLibrary() {
  renderPageLibrary();
  onCheckButtonLibrary();
  refs.header.addEventListener('click', onClickBtn);
}

function onClickBtn() {
  const refs = {
    logo: document.querySelector('.header__logo--text'),
    home: document.querySelector('#button__home'),
    library: document.querySelector('#button__library'),
    btnWatched: document.querySelector('.btn__watched'),
    btnQueue: document.querySelector('#btn__queue'),
  };

  if (event.target === refs.library) {
    onLibrary();
  } else if (event.target === refs.home || event.target === refs.logo) {
    onHome();
  } else if (event.target === refs.btnWatched) {
    event.target.classList.add('btn__library--active');
    refs.btnQueue.classList.remove('btn__library--active');
    renderWatched();
  } else if (event.target === refs.btnQueue) {
    event.target.classList.add('btn__library--active');
    refs.btnWatched.classList.remove('btn__library--active');
    renderQueue();
  }
}

function renderPageLibrary() {
  const refs = {
    home: document.querySelector('.header__home'),
    btnHome: document.querySelector('.navigation__button--home'),
    btnLibrary: document.querySelector('.navigation__button--library'),
    search: document.querySelector('#search-form'),
    btnLibraryHero: document.querySelector('.library__btn-list'),
    header: document.querySelector('.header'),
  };

  refs.home.classList.add('header__library');
  refs.btnHome.classList.remove('navigation__button--current');
  refs.btnLibrary.classList.add('navigation__button--current');
  refs.search.style.display = 'none';
  refs.btnLibraryHero.style.display = 'flex';
  refs.header.style.backgroundColor = '#0E0004';
}

export function onCheckButtonLibrary() {
  const refs = {
    btnWatched: document.querySelector('.btn__watched'),
    btnQueue: document.querySelector('#btn__queue'),
  };

  if (refs.btnWatched.classList.contains('btn__library--active')) {
    renderWatched();
  } else {
    renderQueue();
  }
}
