import { renderPopular } from './render_popular';
import { renderSearch } from './render_search';
import { renderWatched, renderQueue } from './render_library';
import { getFromStorage } from './storage';


export function smoothScroll() {
  document
  .querySelector('.cards').scrollIntoView({block: "start", behavior: "smooth"});
}

export function loadMoreChangeHandler (handlerFunction) {
  document.querySelector('.pagination-btn').replaceWith(document.querySelector('.pagination-btn').cloneNode(true));
  document.querySelector('.pagination-btn').addEventListener('click', handlerFunction);
}

export function paginationChangeHandler (handlerFunction) {
  document.querySelector('.pagination-list').replaceWith(document.querySelector('.pagination-list').cloneNode(true));
  document.querySelector('.pagination-list').addEventListener('click', handlerFunction);
}

export function choiceMainRender() {
    
  if (getFromStorage('mainState') === "Popular")
    renderPopular();
  if (getFromStorage('mainState') === "Search")
    renderSearch();
  
  if (getFromStorage('mainState') === "Library") {
    if (getFromStorage('libraryState') === "Watched")
      renderWatched();
    if (getFromStorage('libraryState') === "Queue")
      renderQueue();
  }

}