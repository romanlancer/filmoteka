import { onHome } from './home';
import compiledTemplateLibrary from '../markup/header-library.hbs';
import MoviesApiService from './fetch_api';

const moviesApiService = new MoviesApiService();

const header = document.querySelector('#header');

export function onLibrary() {
  header.innerHTML = '';
  header.insertAdjacentHTML('beforeend', compiledTemplateLibrary());

  header.addEventListener('click', onClickBtn);
}

function onClickBtn() {
  const refs = {
    logo: document.querySelector('.header__logo--text'),
    home: document.querySelector('#button__home'),
    library: document.querySelector('#button__library'),
    btn__watched: document.querySelector('#btn__watched'),
    btn__queue: document.querySelector('#btn__queue'),
  };

  if (event.target === refs.library) {
    onLibrary();
  } else if (event.target === refs.home || event.target === refs.logo) {
    onHome();
  } else if (event.target === refs.btn__watched) {
    console.log('btn__watched');
  } else if (event.target === refs.btn__queue) {
    console.log('btn__queue');
  }
}
