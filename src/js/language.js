import { refs } from './refs';
import { renderPopular } from './render_popular';
import { moviesApiService } from './render_popular';
import { renderSlideFilms } from './slider_films';

async function onLangSelected(event) {
  let langCheck = event.target.value;
  if (langCheck === 'uk') {
    moviesApiService.lang = langCheck;
    renderPopular();
    renderSlideFilms();
    onButtonUa();
  } else {
    moviesApiService.lang = langCheck;
    renderPopular();
    renderSlideFilms();
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
  refs.iconGoogleUa.classList.remove('is-hidden');
  refs.iconGoogleEn.classList.add('is-hidden');
  refs.iconStoreUa.classList.remove('is-hidden');
  refs.iconStoreEn.classList.add('is-hidden');
  
  
}

function onButtonEng() {
  refs.home.textContent = 'HOME';
  refs.library.textContent = 'MY LIBRARY';
  refs.input.placeholder = 'Search films';
  refs.sliderTitle.textContent = 'WATCH TREND MOVIES';
  refs.textApp.textContent = 'OUR APPLICATIONS';
  refs.appSupp.textContent = 'Support';
  refs.textJoin.textContent = 'JOIN OUR NETWORKS';
  refs.iconGoogleUa.classList.add('is-hidden');
  refs.iconGoogleEn.classList.remove('is-hidden');
  refs.iconStoreUa.classList.add('is-hidden');
  refs.iconStoreEn.classList.remove('is-hidden');
}

refs.language.addEventListener('change', onLangSelected);
