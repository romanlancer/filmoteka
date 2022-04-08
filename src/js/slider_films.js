import Glide from '@glidejs/glide';
import MoviesApiService from './fetch_api';
import { createElement } from './createElement';

const refs = {
  slidesContainer: document.querySelector('#glide__slides'),
};

// glide.on('', function () {
//   console.log('hahaha');
// });

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
  new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 8,
    autoplay: 3000,
    keyboard: true,
    animationDuration: 1000,
    keyboard: true,
    animationTimingFunc: 'ease-out',
    peek: { before: 100, after: 100 },
  }).mount();
}
