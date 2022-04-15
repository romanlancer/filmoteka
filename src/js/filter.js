import { refs } from './refs';
import { moviesApiService } from './render_popular';
import { renderFilmList } from './filmCard';
refs.filterListGenres.addEventListener('change', onGenresFilter);
refs.filterListYears.addEventListener('change', onYearsFilter);
refs.filterListLanguages.addEventListener('change', onLanguagesFilter);
refs.filterListVoteAverage.addEventListener('change', onVotesFilter);
let startYear = 1907;
let endYear = new Date().getFullYear();

const yearsList = () => {
  let str = `<option value="" selected>All Year</option>`;
  for (let i = endYear; i >= startYear; i -= 1) {
    str += `<option value="${i}">${i}</option>`;
  }
  return str;
};

refs.filterListYears.innerHTML = yearsList();

function onGenresFilter(e) {
  let genre = e.target.value;
  moviesApiService.genre = Number(genre);
  moviesApiService.getFilteredMovies().then(({ results }) => {
    renderFilmList(results);
  });
}

function onYearsFilter(e) {
  let year = e.target.value;
  moviesApiService.year = Number(year);
  moviesApiService.getFilteredMovies().then(({ results }) => {
    renderFilmList(results);
  });
}

function onLanguagesFilter(e) {
  let language = e.target.value;
  moviesApiService.originalLanguage = language;
  moviesApiService.getFilteredMovies().then(({ results }) => {
    renderFilmList(results);
  });
}

function onVotesFilter(e) {
  let vote = e.target.value;
  moviesApiService.vote = Number(vote);
  moviesApiService.getFilteredMovies().then(({ results }) => {
    renderFilmList(results);
  });
}
