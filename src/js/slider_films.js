// import Glide from '@glidejs/glide';
import Glide from '@glidejs/glide';
import MoviesApiService from './fetch_api';
import { createElement } from './createElement';

const refs = {
  slidesContainer: document.querySelector('#glide__slides'),
};

const moviesApiService = new MoviesApiService();

moviesApiService.getTrendFilms().then(({ results }) => {
  addElFilms(results);
  console.log(results);
});

function addElFilms(results) {
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
        class: 'glide__slide',
      },
      image,
    );
    arrFilmTrends.push(li);
  });
  refs.slidesContainer.append(...arrFilmTrends);

  const config = {
    type: 'carousel',
    perView: 10,
    autoplay: 2500,
    gap: 15,
    touchRatio: 0.1,
    keyboard: true,
    hoverpause: true,
    animationDuration: 1000,
    animationTimingFunc: 'ease-out',
    peek: { before: 50, after: 50 },
    breakpoints: {
      2000: {
        perView: 10,
      },
      1600: {
        perView: 8,
      },
      1280: {
        perView: 7,
      },
      1023: {
        perView: 5,
      },
      500: {
        perView: 2,
      },
    },
  };
  new Glide('.glide', config).mount();
  changeStyleArrow();
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
