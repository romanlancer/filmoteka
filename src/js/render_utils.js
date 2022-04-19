import imageNoDataLight from '../images/no-list-light.svg'
import imageNoDataDark from '../images/no-list-dark.svg'
import { createElement } from './createElement';
import { renderFilter } from './render_filter';
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

  switch (getFromStorage('mainState')) {
  case 'Popular':
    renderPopular();
    break;
  case 'Search':
    renderSearch();
      break;
    case 'Library':
      if (getFromStorage('libraryState') === 'Queue') renderQueue();
      else renderWatched();
      break;
    default:
      renderPopular();
      break;
  }
}

export function addImgNodata() {
  let src = '';
  let textClass = '';
  let textContent = '';
  let textDescription = '';
  const themeCheck = getFromStorage('theme');
  if (themeCheck === 'dark') {
    src = imageNoDataDark;
    textClass = 'nodata-text dark'
  } else if (themeCheck === 'light') {
    src = imageNoDataLight;
    textClass = 'nodata-text light'
  } else {
    const date = new Date();
    const dateNow = date.getHours();
    if (dateNow >= 6 && dateNow <= 22) {
      src = imageNoDataLight;
      textClass = 'nodata-text light'
    } else {
      src = imageNoDataDark;
      textClass = 'nodata-text dark'
    }
  } 
  const langCheck = getFromStorage('language');
  if (langCheck === 'uk') {
    textContent = 'ПУСТО!!!';
    textDescription = 'У вашій колекції нічого немає';
  }
  else {
    textContent = 'Nothing!!!';
    textDescription = 'Your collection list is empty.';
  }

  const img = createElement(
    'div',
    {
      class: `nodata-container`
    },
    [createElement(
      'img',
      {
        class: 'nodata-image',
        src: `${src}`,
        width: 400,
        alt: 'image no data',
        loading: 'lazy',
      },
      ''
    ),
    createElement(
      'p',
      {
        class: `${textClass}`,
      },
      `${textContent}`
      ),
    createElement(
      'p',
      {
        class: 'nodata-text-description',
      },
      `${textDescription}`
      )
    ]
    );
    document.querySelector('.cards__list').before(img);
}

export function removeImgNodata() {
  if(document.querySelector('.cards__list').previousElementSibling)
    document.querySelector('.cards__list').previousElementSibling.remove();
}