import { createElement } from './createElement';
import { genresInfo } from './genres_info';
import ComingSoonImg from '../images/movie-poster-coming-soon.jpg';

// `https://image.tmdb.org/t/p/w500${posterPath}`
const containerEl = document.querySelector('.cards__list');

export const filmCard = filmData => {
  const {
    id: filmId,
    poster_path: posterPath,
    original_title: originalTitle,
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
  } 

  const filmPosterElem = createElement('img', {
    class: 'cards__item-poster',
    src: filmPoster(),
    // onerror: "this.src='../images/no-logo-120.jpg';",
    alt: 'film poster',
    loading: "lazy",
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



// функция отрисовки карточек фильмов
export function renderFilmList(filmList) {
  containerEl.innerHTML = '';
  const filmsNodeList = filmList.map(film => filmCard(film));
  containerEl.append(...filmsNodeList);
}
