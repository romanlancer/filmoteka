import MoviesApiService from './fetch_api';
import movieInfo from '../templates/movie.hbs';
const cardsList = document.querySelector('.cards__list');
const movieModal = document.querySelector('.backdrop');
const closeModalButton = document.querySelector('.button-close');
const query = new MoviesApiService();

cardsList.addEventListener('click', event => {
  openModal(event);
});

function toggleModal() {
  movieModal.classList.toggle('is-hidden');
}

const getApiData = async id => {
  try {
    const response = await query.getFilmDetails(id);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('error');
  }
};

const openModal = async event => {
  closeModalButton.addEventListener('click', toggleModal);
  const cardsId = event.target.closest('li');
  console.dir(cardsId.id);
  await getApiData(cardsId.id).then(results => {
    renderMovieCard(results);
  });
  toggleModal();
};

const renderMovieCard = async data => {
  //     const poster = createElement(
  //         'img',
  //         {
  //           class: 'movie-card__image',
  //           src: `https://image.tmdb.org/t/p/w500${ data.poster_path }`,
  //         alt: 'film poster',
  //         },
  //       );

  const movieCard = document.querySelector('.movie-card');
  const movie = handleMovieData(data);
  movieCard.innerHTML = movieInfo(movie);
};

function handleMovieData(data) {
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
  return movie;
}
