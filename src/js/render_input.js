import { moviesApiService } from './render_popular';
import { renderMoviesOnInput } from './inputCard';
import { renderModal } from './modal_details';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const bodyEl = document.querySelector('body');
const searchFormInputEl = document.querySelector('#searchQuery');
const inputContainer = document.querySelector('#search-list');

const DEBOUNCE_DELAY = 300;

searchFormInputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

inputContainer.addEventListener('click', event => {
  renderModal(event);
});
bodyEl.addEventListener('click', inputClose);

function onInputSearch(e) {
  moviesApiService.query = e.target.value.trim();

  inputContainer.innerHTML = '';

  if (moviesApiService.query === '') {
    Notify.failure('Please type something');
    return;
  }
  moviesApiService
    .getFilmsByName()
    .then(({ results, total_results }) => {
      renderMoviesOnInput(results);

      if (total_results === 0 && moviesApiService.query !== 0) {
        Notify.failure('Sorry, film is not found');
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
