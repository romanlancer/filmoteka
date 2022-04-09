import { createElement } from './createElement';
// import MoviesApiService from './fetch_api';
import { genresInfo } from './genres_info';

// const movieApiServies = new MoviesApiService;
const containerEl = document.querySelector('.cards__list');

export const filmCard = filmData => {
  const {
    id: filmId,
    poster_path: posterPath,
    original_title: originalTitle,
    overview,
    genre_ids: genreIds,
    release_date: releaseDate,
    vote_average: voteAverage,
  } = filmData;

  const originalTitleToUpperCase = originalTitle.toUpperCase();
  const releaseYear = releaseDate.slice(0, 4);
  // const genresNames = getGenresNames(genreIds)

  const filmPosterElem = createElement('img', {
    class: 'cards__item-poster',
    src: `https://image.tmdb.org/t/p/w500${posterPath}`,
    alt: 'film poster',
  });

  const filmPosterWrapperElem = createElement(
    'div',
    {
      class: 'cards__item-poster-wrapper',
    },
    filmPosterElem,
  );

  const filmTitleElem = createElement(
    'h2',
    {
      class: 'cards__item-title',
    },
    originalTitleToUpperCase,
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
    },
    voteAverage,
  );

  const filmDataElem = createElement(
    'div',
    {
      class: 'cards__item-info',
    },
    [filmGenresElem, filmReleaseElem, filmRateElem],
  );

  const filmLinkElem = createElement(
    'a',
    {
      class: 'cards__link',
    },
    [filmPosterWrapperElem, filmTitleElem, filmDataElem],
  );

  const filmCardElem = createElement(
    'li',
    {
      class: 'cards__item',
      id: filmId,
    },
    filmLinkElem,
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

// Рендер популярных фильмов
// movieApiServies.getPopularFilms().then(response => {
//     console.log(response.results);
//     renderFilmList(response.results);

// }).catch(error => console.log(error));

// функция отрисовки карточек фильмов
export function renderFilmList(filmList) {
  containerEl.innerHTML = '';

  const filmsNodeList = filmList.map(film => filmCard(film));

  containerEl.append(...filmsNodeList);
}
