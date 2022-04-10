import { createElement } from './createElement';
import { genresInfo } from './genres_info';
import ComingSoonImg from '../images/movie-poster-coming-soon.jpg';
const containerEl = document.querySelector('.cards__list');
const filmRateRef = document.querySelector('.cards__item-vote-average');

export const filmCard = filmData => {
  const {
    id: filmId,
    poster_path: posterPath,
    overview,
    title: originalTitle,
    genre_ids: genreIds,
    release_date: releaseDate,
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
    // onerror: "this.src='../images/no-logo-120.jpg';",
    alt: 'film poster',
    loading: 'lazy',
  });

  const filmPosterOverlayElem = createElement(
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
  for (const genreId of genreIds) {
    genresInfo.map(genreInfo => {
      if (genreInfo.id === genreId) {
        genresNamesArray.push(genreInfo.name);
      }
    });
  }
  if (genresNamesArray.length > 3) {
    const genresNamesArrayShort = genresNamesArray.slice(0, 2).toString() + ', Other';
    return genresNamesArrayShort;
  }

  return genresNamesArray.toString();
}

function assigningСolorRating(voteAverage) {
  let color;
  if (voteAverage <= 5) {
    color = 'red';
  } else if (voteAverage > 5 && voteAverage < 7) {
    color = 'yellow';
  } else if (voteAverage >= 7) {
    color = 'green';
  } else {
    color = 'white';
  }
  return color;
}

console.log(assigningСolorRating(8));

// функция отрисовки карточек фильмов
export function renderFilmList(filmList) {
  containerEl.innerHTML = '';

  const filmsNodeList = filmList.map(film => filmCard(film));

  containerEl.append(...filmsNodeList);
}
