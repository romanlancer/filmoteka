const moviesOnInputList = document.querySelector('#search-list');
import noPoster from '../images/movie-poster-coming-soon.jpg';

export function renderMoviesOnInput(filmArray) {
  moviesOnInputList.innerHTML = '';

  const markup = filmArray
    .map(({ id, title, poster_path, release_date }) => {
      const imagePath =
        poster_path === null ? `${noPoster}` : `https://image.tmdb.org/t/p/w500/${poster_path}`;
      const upperTitle = title.toUpperCase();
      if (!release_date) {
        release_date = [];
      }
      const date = release_date.slice(0, 4);

      return `
                    <li class="search-form-list__item" id="${id}"/>
						<div class="search-form-list__thumbnail">
							<img src=${imagePath} alt="poster" loading='lazy'/>
						</div>
						<div class="search-form-list__info">
							<h3>${upperTitle}</h3>
							<p>${date}</p>
						</div>
					</li>				   	
                `;
    })
    .join('');

  moviesOnInputList.insertAdjacentHTML('afterbegin', markup);
}
