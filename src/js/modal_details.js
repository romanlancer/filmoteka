import { moviesApiService } from './render_popular';
import debounce from 'debounce';
import movieInfo from '../templates/movie.hbs';
import movieInfoTrailer from '../templates/movie_trailer.hbs';
import defaultPoster from '../images/movie-poster-coming-soon.jpg';
import axios from 'axios';
import { clickToWatched, clickToQueue, movieIsInWatched, movieIsInQueue, checkStorage } from './library_watched_queue'

export let currentId = null;
const cardsList = document.querySelector('.cards__list');
const backdrop = document.querySelector('.backdrop-movie');
const closeModalButton = document.querySelector('.button-close');

cardsList.addEventListener('click', event => {
  renderModal(event);
});

// cardsList.addEventListener(
//   'click',
//   debounce(event => {
//     renderModal(event);
//     console.log('sdsss');
//   }, 1050),
// );

function closeModal(event) {
  const iframe = document.getElementById('trailer-iframe');
  if (iframe) {
    iframe.src = '';
  }

  backdrop.classList.add('is-hidden');
  backdrop.firstElementChild.classList.add('is-hidden')
  closeModalButton.removeEventListener('click', closeModal);
  backdrop.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', event => closeModalEscape(event));
  document.body.classList.remove('modal-open');
  backdrop.style.background = '';
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
    backdrop.firstElementChild.classList.remove('is-hidden')
  }, 800);
  document.body.classList.add('modal-open');
}

// const debouncedopenModal = debounce(openModal, 0);

export const renderModal = async event => {
  const cardsId = event.target.closest('li');
  // console.dir(cardsId.id); Очередность отрисовки!
  const data = await moviesApiService.getFilmDetails(cardsId.id);
  const trailer = await moviesApiService.getFilmVideo(cardsId.id);
  if (data) {
    currentId = data.id;
    
    console.log(data);
    renderMovieCard(data, trailer);
    openModal(event);
    const refWatchedBtn = document.querySelector('.movie-data__button.movie-data__button_watched');
    const refQueueBtn = document.querySelector('.movie-data__button.movie-data__button_queue');
    
    refWatchedBtn.addEventListener('click', clickToWatched);
    refQueueBtn.addEventListener('click', clickToQueue);
    checkStorage();    
    movieIsInWatched(refWatchedBtn);
    movieIsInQueue(refQueueBtn);  
    // debouncedopenModal(event);
  }
};

const renderMovieCard = (data, trailer) => {
  const movieCard = document.querySelector('.movie-card');
  const movie = handleMovieData(data, trailer);
  if (movie.trailer) {
    movieCard.innerHTML = movieInfoTrailer(movie);
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
  if (poster) {
    movie.poster = `https://image.tmdb.org/t/p/w500${poster}`;
  } else {
    movie.poster = defaultPoster;
  }
  movie.genres = genresList.join(', ');
  //проверка нулб вынести в функцию
  const backdropImage = data.backdrop_path;
  if (backdropImage !== null) {
    const background = `https://image.tmdb.org/t/p/original/${data.backdrop_path}`;
    console.log(background);
    backdrop.style.backgroundImage = `url('${background}')`;
    backdrop.style.backgroundSize = 'cover';
    backdrop.style.backgroundPosition = '50% 50%';
  }
  //переименовать и вынести
  const video = handleTrailer(trailer);
  if (video) {
    movie.trailer = `https://www.youtube.com/embed/${video}`;
    const response = axios.get(movie.trailer);
    console.log('response ', response);
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
