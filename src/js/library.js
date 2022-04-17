import { renderWatched, renderQueue } from './render_library';

const refs = {
  header: document.querySelector('#header'),
  btnWatched: document.querySelector('#btn__watched'),
  btnQueue: document.querySelector('#btn__queue'),
  filterWrapper: document.querySelector('.filter__wrapper'),
};

export function onLibrary() {
  const reference = {
    btnList: document.querySelector('.library__btn-list'),
  };

  reference.btnList.classList.remove('visually-hidden');
  refs.filterWrapper.classList.add('visually-hidden');
  reference.btnList.addEventListener('click', onClickBtn);

  renderPageLibrary();
  onCheckButtonLibrary();
}

function onClickBtn(event) {
  if (event.target === refs.btnWatched) {
    event.target.classList.add('btn__library--active');
    refs.btnQueue.classList.remove('btn__library--active');
    renderWatched(1);
    // console.log('watched');
  } else if (event.target === refs.btnQueue) {
    event.target.classList.add('btn__library--active');
    refs.btnWatched.classList.remove('btn__library--active');
    renderQueue(1);
    // console.log('queue');
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
