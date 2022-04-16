import { moviesApiService } from './render_popular';
import YouTubePlayer from 'youtube-player';
import defaultPoster from '../images/movie-poster-coming-soon.jpg';
import movieInfoTrailer from '../templates/movie_trailer.hbs';
import movieInfoTrailerUk from '../templates/movie_trailer_uk.hbs';
import { choiceMainRender } from './render_utils';
import {
  clickToWatchedInModal,
  clickToQueueInModal,
  movieIsInWatchedInModal,
  movieIsInQueueInModal,
  checkStorageLibrary,
} from './library_watched_queue';

export let currentId = null;
export let currentDataMovie = null;
const cardsList = document.querySelector('.cards__list');
const backdrop = document.querySelector('.backdrop-movie');
const closeModalButton = document.querySelector('.button-close');
const movieCard = document.querySelector('.movie-card');

cardsList.addEventListener('click', event => {
  if (event.target.nodeName !== 'BUTTON') {
    renderModal(event);
  }
});

function closeModal(event) {
  choiceMainRender();
  const iframe = document.getElementById('trailer-iframe');
  if (iframe) {
    iframe.src = '';
  }
  const playButton = document.querySelector('.open-trailer');
  if (playButton) {
    playButton.removeEventListener('click', openTrailer);
  }
  backdrop.classList.add('is-hidden');
  backdrop.firstElementChild.classList.add('is-hidden');
  closeModalButton.removeEventListener('click', closeModal);
  backdrop.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', event => closeModalEscape(event));
  document.body.classList.remove('modal-open');
  backdrop.style.background = '';
  movieCard.classList.remove('movie-card_dark');
  const raitingList = movieCard.querySelector('.movie-data-table');
  raitingList.classList.remove('movie-data-table_dark');
  const closeModalIcon = closeModalButton.querySelector('.button-close__icon-close');
  closeModalIcon.classList.remove('button-close__icon-close_dark');
}

function closeModalBackdrop(event) {
  if (event.target.classList.value !== 'backdrop-movie') {
    return;
  }
  closeModal();
}

function closeModalEscape(event) {
  if (event.key !== 'Escape') {
    return;
  }
  closeModal();
}

function openModal(event) {
  closeModalButton.addEventListener('click', closeModal);
  backdrop.addEventListener('click', event => closeModalBackdrop(event));
  document.addEventListener('keydown', event => closeModalEscape(event));
  backdrop.classList.remove('is-hidden');

  setTimeout(() => {
    backdrop.firstElementChild.classList.remove('is-hidden');
  }, 300);
  document.body.classList.add('modal-open');
}

export const renderModal = async event => {
  if (event.target.nodeName === 'BUTTON') {
    return;
  }
  const cardsId = event.target.closest('li');
  const data = await moviesApiService.getFilmDetails(cardsId.id);
  const trailer = await moviesApiService.getFilmVideo(cardsId.id);
  if (data) {
    console.log(data);
    currentId = data.id;
    renderMovieCard(data, trailer);
    checkTheme();
    openModal(event);
    const refWatchedBtn = document.querySelector('.movie-data__button.movie-data__button_watched');

    const refQueueBtn = document.querySelector('.movie-data__button.movie-data__button_queue');

    refWatchedBtn.addEventListener('click', clickToWatchedInModal);
    refQueueBtn.addEventListener('click', clickToQueueInModal);
    checkStorageLibrary();
    movieIsInWatchedInModal(refWatchedBtn);
    movieIsInQueueInModal(refQueueBtn);
  }
};

const renderMovieCard = (data, trailer) => {
  const movie = handleMovieData(data, trailer);
  const pageLanguage = localStorage.getItem('language');
  if (pageLanguage === '"uk"') {
    movieCard.innerHTML = movieInfoTrailerUk(movie);
  }
  if (pageLanguage === '"en"') {
    movieCard.innerHTML = movieInfoTrailer(movie);
  }
  checkTrailer(movie.trailer);
};

function handleMovieData(data, trailer) {
  const {
    poster_path: poster,
    original_title,
    title,
    vote_average: vote,
    vote_count: votes,
    popularity,
    genres,
    overview,
  } = data;
  const genresList = Object.values(genres).flatMap(genre => genre.name);
  const movie = { title, original_title, vote, votes, popularity, overview };
  movie.poster = poster ? `https://image.tmdb.org/t/p/w500${poster}` : defaultPoster;
  movie.genres = genresList.join(', ');
  const backdropImage = data.backdrop_path;
  if (backdropImage !== null) {
    const background = `https://image.tmdb.org/t/p/original/${data.backdrop_path}`;
    backdrop.style.backgroundImage = `url('${background}')`;
    backdrop.style.backgroundSize = 'cover';
    backdrop.style.backgroundPosition = '50% 50%';
  }
  const video = handleTrailer(trailer);
  if (video) {
    movie.trailer = `https://www.youtube.com/embed/${video}`;
  }

  return movie;
}

function handleTrailer(trailer) {
  if (trailer.results.length === 0) {
    return null;
  } else {
    return trailer.results[0].key;
  }
}

function openTrailer(event) {
  const iframe = document.getElementById('trailer-iframe');
  iframe.classList.remove('is-hidden');

  // const player = YouTubePlayer('player-trailer', {
  //   videoId: 'M7lc1UVf-VE',
  // });

  // player.playVideo();
}

function checkTheme() {
  const theme = localStorage.getItem('theme');
  if (theme === '"dark"') {
    movieCard.classList.add('movie-card_dark');
    console.log(1);
    const raitingList = movieCard.querySelector('.movie-data-table');
    raitingList.classList.add('movie-data-table_dark');
    const closeModalIcon = closeModalButton.querySelector('.button-close__icon-close');
    closeModalIcon.classList.add('button-close__icon-close_dark');
  }
}

function checkTrailer(trailer) {
  if (trailer) {
    const playButton = movieCard.querySelector('.open-trailer');
    console.log(playButton);
    playButton.addEventListener('click', openTrailer);
  } else {
    const overlay = movieCard.querySelector('.movie-card__image_overlay');
    overlay.classList.add('is-hidden');
  }
}
