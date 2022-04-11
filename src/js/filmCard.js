import { createElement } from './createElement';
import { genresInfo, genresInfoUk } from './genres_info';
import ComingSoonImg from '../images/movie-poster-coming-soon.jpg';
import { refs } from './refs';
const containerEl = document.querySelector('.cards__list');
// const filmRateRef = document.querySelector('.cards__item-vote-average');



export const filmCard = filmData => {
  const {
    id: filmId,
    poster_path: posterPath,
    overview,
    original_title: originalTitle,
    genre_ids: genreIds,
    release_date: releaseDate = [],
    vote_average: voteAverage,
  } = filmData;

  const originalTitleToUpperCase = originalTitle.toUpperCase();
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

  const filmPosterOverlayElem = createElement(
    'div',
    {
      class: 'cards__item-poster-overlay',
    },
    BtnListElem,
  );

  const filmPosterOverlayTextElem = createElement(
    'p',
    {
      class: 'cards__item-poster-overlay',
    },
    overview,
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
    originalTitleToUpperCase,
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

function getGenresNames(genreIds) {
  let genresNamesArray = [];
  let languageSelected = refs.language.value;
  for (const genreId of genreIds) {
    if (languageSelected === 'uk') {
      genresInfoUk.map(genreInfoUk => {
        if (genreInfoUk.id === genreId) {
          genresNamesArray.push(genreInfoUk.name);
        }
      })
      if (genresNamesArray.length > 3) {
        const genresNamesArrayShort = genresNamesArray.slice(0, 2).join(', ') + ', Інші';
        return genresNamesArrayShort;
  }

    } else {
       genresInfo.map(genreInfo => {
        if (genreInfo.id === genreId) {
          genresNamesArray.push(genreInfo.name);
        }
      })  
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