
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import MoviesApiService from './fetch_api';
import movieInfo from '../templates/movie.hbs';
const cardsList = document.querySelector('.cards__list');
const backdrop = document.querySelector('.backdrop-movie');
const closeModalButton = document.querySelector('.button-close');
const query = new MoviesApiService();

cardsList.addEventListener('click', event => {
  renderModal(event);
});

function closeModal(event) {
  const iframe = document.getElementById('trailer-iframe');
  iframe.src = '';
  backdrop.classList.add('is-hidden');
  closeModalButton.removeEventListener('click', closeModal);
  backdrop.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', event => closeModalEscape(event));
  document.body.classList.remove('modal-open');
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
  document.body.classList.add('modal-open');
}

const getMovieData = async id => {
  try {
    const response = await query.getFilmDetails(id);
    if (response.status !== 200) {
      Notify.failure('Oops, an error occurred');
      return;
    }
    return response.data;
  } catch (error) {
    Notify.failure('Oops, an error occurred');
  }
};

const getMovieTrailer = async id => {
  try {
    const response = await query.getFilmVideo(id);
    if (response.status !== 200) {
      Notify.failure('Oops, an error occurred');
      return;
    }
    return response.data;
  } catch (error) {
    Notify.failure('Oops, an error occurred');
  }
};

const renderModal = async event => {
  const cardsId = event.target.closest('li');
  // console.dir(cardsId.id); Очередность отрисовки!
  const data = await getMovieData(cardsId.id);
  const trailer = await getMovieTrailer(cardsId.id);
  if (data) {
    console.log(data);
    renderMovieCard(data, trailer);
    openModal(event);
  }
};

const renderMovieCard = (data, trailer) => {
  const movieCard = document.querySelector('.movie-card');
  const movie = handleMovieData(data, trailer);
  movieCard.innerHTML = movieInfo(movie);
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
  movie.poster = `https://image.tmdb.org/t/p/w500${poster}`;
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
