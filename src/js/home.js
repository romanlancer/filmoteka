import { onLibrary } from './library';
import { renderPopular } from './render_popular';
import { addToStorage, getFromStorage } from './storage';
import { onButtonUa, onButtonEng } from './language';
import { refs } from './refs';

//after refresh and close browser start function
addToStorage('mainState', `"Popular"`);
onHome();

//view localStorage by language and render page

export function onHome() {
  const lang = 'en';
  renderPageHome();
  refs.btnListLibrary.classList.add('visually-hidden');
  refs.header.addEventListener('click', onClickBtnHome);
  refs.filterWrapper.classList.remove('visually-hidden');
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
}

/// function for header button

function onClickBtnHome() {
  const refs = {
    logo: document.querySelector('.header__logo--text'),
    home: document.querySelector('#button__home'),
    library: document.querySelector('#button__library'),
  };

  if (event.target === refs.library) {
    onLibrary();
  } else if (event.target === refs.home || event.target === refs.logo) {
    onHome();
    renderPopular();
  }
}

//render page home and remove class page library

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
