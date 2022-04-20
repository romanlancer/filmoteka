import { renderWatched, renderQueue } from './render_library';
import { smoothScroll } from './render_utils';
import { addToStorage, getFromStorage } from './storage';
import { onButtonUa, onButtonEng } from './language';

const refs = {
  header: document.querySelector('#header'),
  btnWatched: document.querySelector('#btn__watched'),
  btnQueue: document.querySelector('#btn__queue'),
  filterWrapper: document.querySelector('.filter__wrapper'),
  filterContainer: document.querySelector('.filter-container'),
  btnLangUa: document.querySelector('.btn-ua'),
  btnLangEn: document.querySelector('.btn-en'),
};

export function onLibrary() {
  const reference = {
    btnList: document.querySelector('.library__btn-list'),
  };
  refs.filterContainer.classList.add('is-hidden');
  reference.btnList.classList.remove('visually-hidden');
  refs.filterWrapper.classList.add('visually-hidden');
  reference.btnList.addEventListener('click', onClickBtn);
  const lang = 'en';
  if (getFromStorage('language') === 'uk') {
    refs.btnLangUa.classList.add('active-select');
    refs.btnLangEn.classList.remove('active-select');
    onButtonUa();
  } else {
    addToStorage('language', `"${lang}"`);
    refs.btnLangEn.classList.add('active-select');
    refs.btnLangUa.classList.remove('active-select');
    onButtonEng();
  }
  renderPageLibrary();
  onCheckButtonLibrary();
}

function onClickBtn(event) {
  if (event.target === refs.btnWatched) {
    event.target.classList.add('btn__library--active');
    refs.btnQueue.classList.remove('btn__library--active');
    smoothScroll();
    renderWatched();
  } else if (event.target === refs.btnQueue) {
    event.target.classList.add('btn__library--active');
    refs.btnWatched.classList.remove('btn__library--active');
    smoothScroll();
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
