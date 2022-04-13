import { onLibrary } from './library';
import { renderPopular } from './render_popular';
import { getFromStorage } from './storage';
import { onButtonUa, onButtonEng } from './language';
import { refs } from './refs';

//after refresh and close browser start function

onHome();
renderPopular(1);

//view localStorage by language and render page

export function onHome() {
  renderPageHome();
  refs.header.addEventListener('click', onClickBtn);

  if (getFromStorage('language') === 'uk') {
    onButtonUa();
  } else {
    onButtonEng();
  }
}

/// function for header button

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
    renderPopular(1);
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

//hover logo

function logoMouseOver() {
  document.querySelector('.header__icon--top').style.cssText = `
  opacity: 1;
  transform: translateY(25px);`;

  document.querySelector('.header__icon--bottom').style.cssText = `
    opacity: 0;
    transform: translateY(25px);`;
}

function logoMouseOverOff() {
  document.querySelector('.header__icon--top').style.cssText = `
  opacity: 0;
  transform: translateY(0);`;

  document.querySelector('.header__icon--bottom').style.cssText = `
    opacity: 1;
    transform: translateY(0);`;
}

refs.logoText.addEventListener('mouseover', logoMouseOver);
refs.logoText.addEventListener('mouseout', logoMouseOverOff);
