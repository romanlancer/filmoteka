import { moviesApiService } from './render_popular';
import { renderMoviesOnInput } from './inputCard';
import { renderModal } from './modal_details';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const bodyEl = document.querySelector('body');
const searchFormInputEl = document.querySelector('#searchQuery');
const inputContainer = document.querySelector('#search-list');
console.log(searchFormInputEl);
const DEBOUNCE_DELAY = 300;

Notiflix.Notify.init({
  position: 'center-top',
  width: '400px',
  fontSize: '18px',
});

searchFormInputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

inputContainer.addEventListener('click', event => {
  renderModal(event);
});
bodyEl.addEventListener('click', inputClose);

function onInputSearch(e) {
  moviesApiService.query = e.target.value.trim();

  inputContainer.innerHTML = '';

  if (moviesApiService.query === '') {
    Notiflix.Notify.failure('Please type something');
    return;
  }
  moviesApiService
    .getFilmsByName()
    .then(({ results, total_results }) => {
      renderMoviesOnInput(results);

      if (total_results === 0 && moviesApiService.query !== 0) {
        Notiflix.Notify.failure('Sorry, film is not found');
      }
      if (results.length > 0) {
        renderMoviesOnInput(results);
      } else {
        inputContainer.innerHTML = '';
      }
    })
    .catch();
}

function inputClose(e) {
  if (e.target.className !== 'search-form_input') {
    inputContainer.innerHTML = '';
  }
}
