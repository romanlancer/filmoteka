import { refs } from './refs';
import { renderPopular } from './render_popular';
import { moviesApiService } from './render_popular';
import { renderSlideFilms } from './slider_films';

async function onLangSelected(event) {
  let langCheck = event.target.value;
  if (langCheck === 'ua') {
    onButtonUa();
    moviesApiService.lang = langCheck;
    renderPopular();
    renderSlideFilms();
  } else {
    moviesApiService.lang = langCheck;
    onButtonEng();
    renderPopular();
    // renderSlideFilms();
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
  refs.home.textContent = 'HOME';
  refs.library.textContent = 'MY LIBRARY';
  refs.input.placeholder = 'Search films';
  refs.sliderTitle.textContent = 'WATCH TREND MOVIES';
  refs.textApp.textContent = 'OUR APPLICATIONS';
  refs.appSupp.textContent = 'Support';
  refs.textJoin.textContent = 'JOIN OUR NETWORKS';
}

refs.language.addEventListener('change', onLangSelected);
