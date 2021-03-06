import { refs } from './refs';
import genresUA from '../templates/filter_genres_ua.hbs';
import genresUK from '../templates/filter_genres_uk.hbs';
import languagesUA from '../templates/filter_languages_ua.hbs';
import languagesUK from '../templates/filter_languages_uk.hbs';
import { moviesApiService } from './render_popular';
import { renderSlideFilms } from './slider_films';
import { addToStorage, getFromStorage } from './storage';
import { choiceMainRender } from './render_utils';

function onLangSelected(event) {
  let langCheck = event.target.value;
  if (langCheck === 'uk') {
    refs.btnLangUa.classList.toggle('active-select');
    refs.btnLangEn.classList.remove('active-select');

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

function changeGenresTextUa() {
  refs.filterListGenres.innerHTML = '';
  refs.filterListGenres.insertAdjacentHTML('beforeend', genresUA());
}

function changeGenresTextUk() {
  refs.filterListGenres.innerHTML = '';
  refs.filterListGenres.insertAdjacentHTML('beforeend', genresUK());
}

function changeLanguagesTextUa() {
  refs.filterListLanguages.innerHTML = '';
  refs.filterListLanguages.insertAdjacentHTML('beforeend', languagesUA());
}

function changeLanguagesTextUk() {
  refs.filterListLanguages.innerHTML = '';
  refs.filterListLanguages.insertAdjacentHTML('beforeend', languagesUK());
}

export function onButtonUa() {
  changeLanguagesTextUa();
  changeGenresTextUa();
  refs.filterListVoteAverage[0].textContent = 'Середній рейтинг';
  refs.filterListYears[0].textContent = 'Усі роки';
  refs.settingsText.textContent = 'Налаштування';
  refs.filterText.textContent = 'Фільтр';
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
  renderSlideFilms();
  choiceMainRender();
}

export function onButtonEng() {
  changeGenresTextUk();
  changeLanguagesTextUk();
  refs.filterListVoteAverage[0].textContent = 'All votes average';
  refs.filterListYears[0].textContent = 'All years';
  refs.filterText.textContent = 'Filter';
  refs.settingsText.textContent = 'Settings';
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
  renderSlideFilms();
  choiceMainRender();
}

refs.languageList.addEventListener('click', onLangSelected);
