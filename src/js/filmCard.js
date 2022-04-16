import { createElement } from './createElement';
import { genresInfo, genresInfoUk } from './genres_info';
import ComingSoonImg from '../images/movie-poster-coming-soon.jpg';
import { refs } from './refs';
import { renderPopular } from './render_popular';
import { getFromStorage } from './storage';

import { renderWatched, renderQueue } from './render_library';

import {
  checkMovieInWatched,
  checkMovieInQueue,
  clickToWatchedOnCard,
  clickToQueueOnCard,
  checkStorageLibrary,
} from './library_watched_queue';


const containerEl = document.querySelector('.cards__list');
containerEl.addEventListener('click', clickToWatchedOnCard);
containerEl.addEventListener('click', clickToQueueOnCard);
// const filmRateRef = document.querySelector('.cards__item-vote-average');

export const filmCard = filmData => {
  const {
    id: filmId,
    poster_path: posterPath,
    overview,
    title,
    genre_ids: genreIds,
    genres,
    release_date: releaseDate = "",
    vote_average: voteAverage,
  } = filmData;

  const titleToUpperCase = title.toUpperCase();
  const releaseYear = releaseDate.slice(0, 4);
  const posterComingSoon = ComingSoonImg;
  const posterExisting = `https://image.tmdb.org/t/p/w500${posterPath}`;

  const filmPoster = () => {
    if (posterPath === null) {
      return posterComingSoon;
    }
    return posterExisting;
  };

  const filmRaiting = voteAverage => {
    return voteAverage === 0 ? '0' : voteAverage;
  };

  //Разметка карточки
  const filmPosterElem = createElement('img', {
    class: 'cards__item-poster',
    src: filmPoster(),
    width: 500,
    height: 750,
    alt: 'film poster',
    loading: 'lazy',
  });

  const btnAddToWatchedItemElem = createElement(
    'button',
    {
      class: `${checkMovieInWatched(filmId)}`,
      dataset: {'btn': 'watched'},
    },
    'add to watched',
  );

  const btnAddToQueueItemElem = createElement(
    'button',
    {
      class: `${checkMovieInQueue(filmId)}`,
      dataset: {'btn': 'queue'},
    },
    'add to queue',
  );

  const btnItemAddToWatchedItemElem = createElement(
    'li',
    {
      class: 'movie-data__button-item',
    },
    btnAddToWatchedItemElem,
  );

  const btnItemAddToQueueItemElem = createElement(
    'li',
    {
      class: 'movie-data__button-item',
    },
    btnAddToQueueItemElem,
  );

  const BtnListElem = createElement(
    'ul',
    {
      class: 'movie-data__buttons-list cards__item-btn-list',
    },
    [btnItemAddToWatchedItemElem, btnItemAddToQueueItemElem],
  );

  const filmPosterOverlayTextElem = createElement(
    'p',
    {
      class: 'cards__item-poster-overlay-text',
      style: `color: ${defineOverlayTextColorByTheme()}`,
    },
    overview,
  );

  const filmPosterOverlayElem = createElement(
    'div',
    {
      class: 'cards__item-poster-overlay',
      style: `background-color: ${defineOverlayBGColorByTheme()}`,
    },
    [filmPosterOverlayTextElem, BtnListElem],
  );

  const filmPosterLinkElem = createElement(
    'a',
    {
      class: 'cards__item-poster-link',
    },
    [filmPosterElem, filmPosterOverlayElem],
  );

  const filmPosterWrapperElem = createElement(
    'div',
    {
      class: 'cards__item-poster-wrapper',
    },
    [filmPosterLinkElem],
  );

  const filmTitleTextElem = createElement(
    'span',
    {
      class: 'cards__item-title-text',
    },
    titleToUpperCase,
  );

  const filmTitleLinkElem = createElement(
    'a',
    {
      class: 'cards__item-title-link',
    },
    filmTitleTextElem,
  );

  const filmTitleElem = createElement(
    'h2',
    {
      class: 'cards__item-title',
      style: `color: ${defineOverlayTextColorByTheme()}`
    },
    filmTitleLinkElem,
  );

  const filmGenresElem = createElement(
    'p',
    {
      class: 'cards__item-genres',
    },
    getGenresNames(genreIds, genres),
  );

  const filmReleaseElem = createElement(
    'p',
    {
      class: 'cards__item-release-date',
    },
    releaseYear,
  );

  const filmRateElem = createElement(
    'span',
    {
      class: 'cards__item-vote-average',
      // style: `border-color: ${assigningСolorRating(voteAverage)}`,
    },
    filmRaiting(voteAverage),
  );

  const filmDataElem = createElement(
    'div',
    {
      class: 'cards__item-info',
    },
    [filmGenresElem, filmReleaseElem, filmRateElem],
  );

  const filmCardElem = createElement(
    'li',
    {
      class: 'cards__item',
      id: filmId,
    },
    [filmPosterWrapperElem, filmTitleElem, filmDataElem],
  );

  return filmCardElem;
};

// функция отрисовки карточек фильмов
export function renderFilmList(filmList) {
  containerEl.innerHTML = '';
  checkStorageLibrary();
  if(containerEl.previousElementSibling)
    containerEl.previousElementSibling.remove();

  const filmsNodeList = filmList.map(film => filmCard(film));

  containerEl.append(...filmsNodeList);
}

export function clearContainer() {
  containerEl.innerHTML = '';
}

export function addFilmListToContainer(filmList) {
  checkStorageLibrary();
  const filmsNodeList = filmList.map(film => filmCard(film));
  containerEl.append(...filmsNodeList);
}

//функция для получения названий жанров фильма с учетом выбранного языка страницы
function getGenresNames(genreIds, genres) {
  let genresNamesArray = [];
  let languageSelected = getFromStorage('language');
  if (genreIds === undefined) {
    genresNamesArray = Object.values(genres).flatMap(genre => genre.name);
    if (genresNamesArray.length > 3) {
      if (languageSelected === 'uk') {
        const genresNamesArrayShort = genresNamesArray.slice(0, 2).join(', ') + ', Інші';
        return genresNamesArrayShort;
      } else {
        const genresNamesArrayShort = genresNamesArray.slice(0, 2).join(', ') + ', Other';
        return genresNamesArrayShort;
      }      
      
    }
    return genresNamesArray.join(', ');
  }
  
  for (const genreId of genreIds) {
    if (languageSelected === 'uk') {
      genresInfoUk.map(genreInfoUk => {
        if (genreInfoUk.id === genreId) {
          genresNamesArray.push(genreInfoUk.name);
        }
      });
      if (genresNamesArray.length > 3) {
        const genresNamesArrayShort = genresNamesArray.slice(0, 2).join(', ') + ', Інші';
        return genresNamesArrayShort;
      }
    } else {
      genresInfo.map(genreInfo => {
        if (genreInfo.id === genreId) {
          genresNamesArray.push(genreInfo.name);
        }
      });
    }
  }
  if (genresNamesArray.length > 3) {
    const genresNamesArrayShort = genresNamesArray.slice(0, 2).join(', ') + ', Other';
    return genresNamesArrayShort;
  }
  return genresNamesArray.join(', ');
}

// function assigningСolorRating(voteAverage) {
//   let color;
//   if (voteAverage <= 5) {
//     color = 'red';
//   } else if (voteAverage > 5 && voteAverage < 7) {
//     color = 'yellow';
//   } else if (voteAverage >= 7) {
//     color = 'green';
//   } else {
//     color = 'white';
//   }
//   return color;
// }



function defineOverlayBGColorByTheme() {
  let themeCheck = getFromStorage('theme');
  let overlayColor;
  const lightOverlayColor = 'rgba(225, 225, 225, 0.7)';
  const darkOverlayColor = 'rgba(0, 0, 0, 0.6)';
  
  if (themeCheck === 'dark') {
    overlayColor = darkOverlayColor;
  } else if (themeCheck === 'light') {
    overlayColor = lightOverlayColor;
  } else {
    const date = new Date();
    const dateNow = date.getHours();
    if (dateNow >= 6 && dateNow <= 22) {
      overlayColor = lightOverlayColor;
    } else {
      overlayColor = darkOverlayColor;
    }
  }
  return overlayColor;
}

function defineOverlayTextColorByTheme() {
  let themeCheck = getFromStorage('theme');
  let textColor;
  const lightTextColor = 'rgba(225, 225, 225, 0.8)';
  const darkTextColor = 'rgb(0, 0, 0)';
  
  if (themeCheck === 'dark') {
    textColor = lightTextColor;
  } else if (themeCheck === 'light') {
    textColor = darkTextColor;
  } else {
    const date = new Date();
    const dateNow = date.getHours();
    if (dateNow >= 6 && dateNow <= 22) {
      textColor = darkTextColor;
    } else {
      textColor = lightTextColor;
    }
  }
  return textColor;
}

// При смене темы - рендер карточек
refs.changeOfTheme.addEventListener('change', onThemeChange);
async function onThemeChange() {
  const homeBtnEl = document.querySelector('#button__home');
  const libruaryBtnEl = document.querySelector('#button__library');
  const whatchedBtnEl = document.querySelector('#btn__watched');
  const queueBtnEl = document.querySelector('#btn__queue');
  
  if (homeBtnEl.classList.contains('navigation__button--current')) {
    renderPopular();
  } else if (libruaryBtnEl.classList.contains('navigation__button--current')) {
    if (whatchedBtnEl.classList.contains('btn__library--active')) {
      renderWatched(1);
    } else if (queueBtnEl.classList.contains('btn__library--active')) {
      renderQueue(1);
    }
  }     
    
}

