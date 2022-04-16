import { createElement } from './createElement';
import { renderFilter } from './filter';
import { renderPopular } from './render_popular';
import { renderSearch } from './render_search';
import { renderWatched, renderQueue } from './render_library';
import { getFromStorage } from './storage';

export function smoothScroll() {
  document.querySelector('.cards').scrollIntoView({ block: 'start', behavior: 'smooth' });
}

export function loadMoreChangeHandler(handlerFunction) {
  document
    .querySelector('.pagination-btn')
    .replaceWith(document.querySelector('.pagination-btn').cloneNode(true));
  document.querySelector('.pagination-btn').addEventListener('click', handlerFunction);
}

export function paginationChangeHandler(handlerFunction) {
  document
    .querySelector('.pagination-list')
    .replaceWith(document.querySelector('.pagination-list').cloneNode(true));
  document.querySelector('.pagination-list').addEventListener('click', handlerFunction);
}

export function choiceMainRender() {
  if (getFromStorage('mainState') === 'Popular') renderPopular();
  if (getFromStorage('mainState') === 'Search') renderSearch();
  if (getFromStorage('mainState') === 'Filter') renderFilter();
  if (getFromStorage('mainState') === 'Library') {
    if (getFromStorage('libraryState') === 'Watched') renderWatched();
    if (getFromStorage('libraryState') === 'Queue') renderQueue();
  }
}

export function addImgNodata() {
  const img = createElement(
      'div',
      {
        class:`${getFromStorage('theme') === "dark" ? 'nodata-image dark' : 'nodata-image light'}`
      },
      ''
    );
    document.querySelector('.cards__list').before(img);
}

export function removeImgNodata() {
  if(document.querySelector('.cards__list').previousElementSibling)
    document.querySelector('.cards__list').previousElementSibling.remove();
}