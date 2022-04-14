import { createElement } from './createElement';
import { genresInfo, genresInfoUk } from './genres_info';
import ComingSoonImg from '../images/movie-poster-coming-soon.jpg';
import { refs } from './refs';
import { renderPopular } from './render_popular';
import { getFromStorage } from './storage';
const containerEl = document.querySelector('.cards__list');
// const filmRateRef = document.querySelector('.cards__item-vote-average');

export const filmCard = filmData => {
  const {
    id: filmId,
    poster_path: posterPath,
    overview,
    title,
    genre_ids: genreIds,
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
      class: 'movie-data__button movie-data__button_inactive cards__item-btn',
    },
    'add to watched',
  );

  const btnAddToQueueItemElem = createElement(
    'button',
    {
      class: 'movie-data__button movie-data__button_inactive cards__item-btn',
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
    },
    filmTitleLinkElem,
  );

  const filmGenresElem = createElement(
    'p',
    {
      class: 'cards__item-genres',
    },
    getGenresNames(genreIds),
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

  const filmsNodeList = filmList.map(film => filmCard(film));

  containerEl.append(...filmsNodeList);
}

export function clearContainer() {
  containerEl.innerHTML = '';
}

export function addFilmListToContainer(filmList) {
  const filmsNodeList = filmList.map(film => filmCard(film));
  containerEl.append(...filmsNodeList);
}

//функция для получения названий жанров фильма с учетом выбранного языка страницы
function getGenresNames(genreIds) {
  let genresNamesArray = [];
  // let languageSelected = refs.language.value;
  let languageSelected = getFromStorage('language');
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

// refs.changeOfTheme.addEventListener('change', onThemeChange);

// async function onThemeChange() {
//   renderPopular();
// }

function defineOverlayBGColorByTheme() {
  let overlayColor;
  const lightOverlayColor = 'rgba(225, 225, 225, 0.7)';
  const darkOverlayColor = 'rgba(0, 0, 0, 0.6)';
  const themeCheck = refs.changeOfTheme.value;

  if (themeCheck === 'dark') {
    overlayColor = darkOverlayColor;
  } else if (themeCheck === 'light') {
    overlayColor = lightOverlayColor;
  } else {
    const date = new Date();
    const dateNow = date.getHours();
    if (dateNow > 6 && dateNow < 21) {
      overlayColor = lightOverlayColor;
    } else {
      overlayColor = darkOverlayColor;
    }
  }
  return overlayColor;
}

function defineOverlayTextColorByTheme() {
  let textColor;
  const lightTextColor = 'rgb(225, 225, 225)';
  const darkTextColor = 'rgb(0, 0, 0)';
  const themeCheck = refs.changeOfTheme.value;

  if (themeCheck === 'dark') {
    textColor = lightTextColor;
  } else if (themeCheck === 'light') {
    textColor = darkTextColor;
  } else {
    const date = new Date();
    const dateNow = date.getHours();
    if (dateNow > 6 && dateNow < 21) {
      textColor = darkTextColor;
    } else {
      textColor = lightTextColor;
    }
  }
  return textColor;
}
