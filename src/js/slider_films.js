import { moviesApiService } from './render_popular';
import { createElement } from './createElement';
import { glide, config } from './slider_glide';
import { renderModal } from './modal_details';
import Glide from '@glidejs/glide';

const containerSlider = document.querySelector('.container__slider');

renderSlideFilms();

export function renderSlideFilms() {
  moviesApiService.getTrendFilms().then(({ results }) => {
    addElFilms(results);
    onClickSliderCard();
  });
}

function addElFilms(results) {
  containerSlider.innerHTML = '';

  const markup = `
  <div class="glide">
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides" id="glide__slides"></ul>
        </div>
        <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left" data-glide-dir="<">&#5130;</button>
            <button class="glide__arrow glide__arrow--right" data-glide-dir=">">&#5125;</button>
        </div>
    </div>`;

  containerSlider.insertAdjacentHTML('beforeend', markup);

  const slidesContainer = document.querySelector('.glide__slides');

  let arrFilmTrends = [];
  results.forEach(el => {
    let image = createElement('img', {
      class: 'cards__image-poster',
      src: `https://image.tmdb.org/t/p/w500${el.poster_path}`,
      alt: 'film__poster',
    });

    let li = createElement(
      'li',
      {
        class: 'glide__slide glide__slide--main',
        id: `${el.id}`,
      },
      image,
    );
    arrFilmTrends.push(li);
  });

  slidesContainer.append(...arrFilmTrends);

  changeStyleArrow();
  glide.destroy();
  let glid = new Glide('.glide', config);
  glid.mount();
}

function changeStyleArrow() {
  const refs = {
    left: document.querySelector('.glide__arrow--left'),
    right: document.querySelector('.glide__arrow--right'),
    current: document.querySelectorAll('.glide__arrow'),
  };

  refs.current.forEach(el => {
    refs.current.forEach(el => {
      el.style.cssText = `
        outline: none;
        box-shadow: none;
        border-radius: 50%;
        padding: 4px 7px;
        background-color: rgba(0, 0, 0, 0.4);
      `;
    });
  });

  refs.left.style.left = `3px`;
  refs.right.style.right = `4px`;
}

function onClickSliderCard() {
  const slidesList = document.querySelector('#glide__slides');
  slidesList.addEventListener('click', event => {
    renderModal(event);
  });
}
