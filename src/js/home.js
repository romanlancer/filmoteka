import compiledTemplateHome from '../markup/header-home.hbs';
import { onLibrary } from './library';
import MoviesApiService from './fetch_api';

const moviesApiService = new MoviesApiService();

const header = document.querySelector('#header');

onHome();

export function onHome() {
  header.innerHTML = '';
  header.insertAdjacentHTML('beforeend', compiledTemplateHome());

  header.addEventListener('click', onClickBtn);

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
  }
  if (event.target === refs.home || event.target === refs.logo) {
    onHome();
  }
}
