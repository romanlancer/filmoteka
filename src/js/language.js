import { refs } from './refs';
import MoviesApiService from './fetch_api';

const moviesApiService = new MoviesApiService();

function onLangSelected(event) {
  let langCheck = event.target.value;
  console.log(langCheck);
  if (langCheck === 'ua') {
    onButtonUa();
    moviesApiService.lang = 'uk';
  } else {
    onButtonEng();
  }
}

function onButtonUa() {
  refs.home.textContent = 'ГОЛОВНА';
  refs.library.textContent = 'МОЯ БІБЛІОТЕКА';
  refs.input.placeholder = 'Пошук фільмів';
  refs.sliderTitle.textContent = 'ФІЛЬМИ ТИЖНЯ';
  refs.btnWatched.textContent = 'Переглянуті';
  refs.btnQueue.textContent = 'Подивитися';
  refs.textApp.textContent = 'Наші додатки';
  refs.appSupp.textContent = 'Підтримка';
  refs.textJoin.textContent = 'Приєднуйся';
}

function onButtonEng() {
  console.log(refs.language);
  refs.home.textContent = 'HOME';
  refs.library.textContent = 'MY LIBRARY';
  refs.input.placeholder = 'Search films';
  refs.sliderTitle.textContent = 'WATCH TREND MOVIES';
  refs.textApp.textContent = 'OUR APPLICATIONS';
  refs.appSupp.textContent = 'Support';
  refs.textJoin.textContent = 'JOIN OUR NETWORKS';
}

refs.language.addEventListener('change', onLangSelected);
