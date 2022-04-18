import { refs } from './refs';
// import { renderPopular } from './render_popular';
import { moviesApiService } from './render_popular';
import { renderSlideFilms } from './slider_films';
import { addToStorage, getFromStorage } from './storage';
import { choiceMainRender } from './render_utils';

function onLangSelected(event) {
  let langCheck = event.target.value;
  if (langCheck === 'uk') {
    refs.btnLangUa.classList.toggle('active-select');
    refs.btnLangEn.classList.remove('active-select');

    // refs.btnQueue.style.padding;
    addToStorage('language', `"${langCheck}"`);
    onButtonUa();
  }
  if (langCheck === 'en') {
    refs.btnLangEn.classList.toggle('active-select');
    refs.btnLangUa.classList.remove('active-select');
    addToStorage('language', `"${langCheck}"`);
    onButtonEng();
  }
}

export function onButtonUa() {
  refs.btnWatched.style.padding = '14px 28px 12px';
  refs.btnQueue.style.padding = '14px 28px 12px';
  refs.home.textContent = 'ГОЛОВНА';
  refs.library.textContent = 'МОЯ БІБЛІОТЕКА';
  refs.input.placeholder = 'Пошук фільмів';
  refs.sliderTitle.textContent = 'ФІЛЬМИ ТИЖНЯ';
  refs.btnWatched.textContent = 'Переглянуті';
  refs.btnQueue.textContent = 'Подивитися';
  refs.textApp.textContent = 'Наші додатки';
  refs.appSupp.textContent = 'Підтримка';
  refs.textJoin.textContent = 'Приєднуйся';
  refs.footerCopywrite.textContent = '2022 | Усі права захищені |';
  refs.footerStudents.textContent = 'Розроблено з';
  refs.footerBy.textContent = '';
  refs.footerLink.textContent = 'студентами GoIT';
  refs.iconGoogleUa.classList.remove('is-hidden');
  refs.iconGoogleEn.classList.add('is-hidden');
  refs.iconStoreUa.classList.remove('is-hidden');
  refs.iconStoreEn.classList.add('is-hidden');
  refs.themeAuto.textContent = 'Авто';
  refs.themeDark.textContent = 'Темна';
  refs.themeLight.textContent = 'Світла';


  moviesApiService.lang = getFromStorage('language');
  // renderPopular();
  renderSlideFilms();
  choiceMainRender();
}

export function onButtonEng() {
  refs.home.textContent = 'HOME';
  refs.library.textContent = 'MY LIBRARY';
  refs.input.placeholder = 'Search films';
  refs.sliderTitle.textContent = 'WATCH TREND MOVIES';
  refs.btnWatched.textContent = 'WATCHED';
  refs.btnQueue.textContent = 'QUEUE';
  refs.textApp.textContent = 'OUR APPLICATIONS';
  refs.appSupp.textContent = 'Support';
  refs.textJoin.textContent = 'JOIN OUR NETWORKS';
  refs.footerCopywrite.textContent = '2022 | All Rights Reserved |';
  refs.footerStudents.textContent = 'Developed with';
  refs.footerBy.textContent = 'by';
  refs.footerLink.textContent = 'GoIT Students';
  refs.iconGoogleUa.classList.add('is-hidden');
  refs.iconGoogleEn.classList.remove('is-hidden');
  refs.iconStoreUa.classList.add('is-hidden');
  refs.iconStoreEn.classList.remove('is-hidden');
  refs.themeAuto.textContent = 'Auto';
  refs.themeDark.textContent = 'Dark';
  refs.themeLight.textContent = 'Light';

  moviesApiService.lang = getFromStorage('language');
  // renderPopular();
  renderSlideFilms();
  choiceMainRender();
}

refs.languageList.addEventListener('click', onLangSelected);
