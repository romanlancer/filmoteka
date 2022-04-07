import compiledTemplateHome from '../markup/header-home.hbs';
import { onLibrary } from './library';
import MoviesApiService from './fetch_api';

const moviesApiService = new MoviesApiService();

const body = document.querySelector('body');

onHome();

export function onHome() {
  body.innerHTML = '';
  body.insertAdjacentHTML('beforeend', compiledTemplateHome());

  moviesApiService.getPopularFilms().then(({ results }) => {
    console.log(results);
  });
}

body.addEventListener('click', onClickBtn);

function onClickBtn() {
  const refs = {
    logo: document.querySelector('#button__logo'),
    home: document.querySelector('#button__home'),
    library: document.querySelector('#button__library'),
  };
  if (event.target === refs.library) {
    onLibrary();
  }
  if (event.target === refs.home) {
    onHome();
  }
}
