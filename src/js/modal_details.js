import { moviesApiService } from './render_popular';
import YouTubePlayer from 'youtube-player';
import movieInfo from '../templates/movie.hbs';
import movieInfoTrailer from '../templates/movie_trailer.hbs';
import defaultPoster from '../images/movie-poster-coming-soon.jpg';
import {
  clickToWatched,
  clickToQueue,
  movieIsInWatched,
  movieIsInQueue,
  checkStorage,
} from './library_watched_queue';

export let currentId = null;
export let currentDataMovie = null;
const cardsList = document.querySelector('.cards__list');
const backdrop = document.querySelector('.backdrop-movie');
const closeModalButton = document.querySelector('.button-close');
const movieCard = document.querySelector('.movie-card');

cardsList.addEventListener('click', event => {
  renderModal(event);
});

function closeModal(event) {
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
  const raitingList = movieCard.querySelector('.movie-data__list_right');
  raitingList.classList.remove('movie-data__list_dark');
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
  const cardsId = event.target.closest('li');
  const data = await moviesApiService.getFilmDetails(cardsId.id);
  const trailer = await moviesApiService.getFilmVideo(cardsId.id);
  if (data) {
    currentId = data.id;
    currentDataMovie = data;
    renderMovieCard(data, trailer);
    checkTheme();
    openModal(event);
    const refWatchedBtn = document.querySelector('.movie-data__button.movie-data__button_watched');

    const refQueueBtn = document.querySelector('.movie-data__button.movie-data__button_queue');

    refWatchedBtn.addEventListener('click', clickToWatched);
    refQueueBtn.addEventListener('click', clickToQueue);
    checkStorage();
    movieIsInWatched(refWatchedBtn);
    movieIsInQueue(refQueueBtn);
  }
};

const renderMovieCard = (data, trailer) => {
  const movie = handleMovieData(data, trailer);
  if (movie.trailer) {
    movieCard.innerHTML = movieInfoTrailer(movie);
    const playButton = document.querySelector('.open-trailer');
    playButton.addEventListener('click', openTrailer);
  } else {
    movieCard.innerHTML = movieInfo(movie);
  }
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
    console.log(background);
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
  console.log(theme);
  if (theme === 'dark') {
    movieCard.classList.add('movie-card_dark');
    const raitingList = movieCard.querySelector('.movie-data__list_right');
    raitingList.classList.add('movie-data__list_dark');
  }
}

// function checkLanguage(ids) {
//   ddd;
// }
