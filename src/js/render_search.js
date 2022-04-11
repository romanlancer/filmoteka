import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { moviesApiService } from './render_popular';
import Pagination from './pagination';
import { renderFilmList, addFilmListToContainer } from './filmCard';
import { paginationChangeHandler,loadMoreChangeHandler, smoothScroll } from './pagination';

const searchFormRef = document.querySelector('#search-form');

const moviePaginationForSearch = new Pagination({
  initialPage: 1,
  total: 1,
  onChange(value) {
    // console.log('change page search');
    renderSearch(value);

  },
});

searchFormRef.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  moviesApiService.query = e.currentTarget.elements.search.value;
  moviesApiService.page = 1;
  if (moviesApiService.query === '') {
    Notify.failure('Please type something');
    return;
  }
  renderSearch();
  smoothScroll();
}

export async function renderSearch(page, query) {
  if (page) {
    moviesApiService.page = page;
  }
  if (query) {
    moviesApiService.query = query;
  }

  Loading.hourglass({
    cssAnimationDuration: 400,
    svgSize: '150px',
    svgColor: '#ff6b01',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  });

  const movies = await moviesApiService.getFilmsByName();

  const { results, total_pages } = movies;

  setTimeout(() => {
    renderFilmList(results);
    moviePaginationForSearch.renderPaginationDisabled(
      document.querySelector('.pagination-list'),
      total_pages, moviesApiService.page 
    );
    moviePaginationForSearch.renderPaginationLoadMore(document.querySelector('.pagination'),
      document.querySelector('.language').value)
    paginationChangeHandler(onPaginationSearchHandler);
    loadMoreChangeHandler(onLoadMoreSearchHandler);
    Loading.remove();
  }, 500);
}

async function onLoadMoreSearchHandler(event) {
  moviesApiService.page += 1;
  
  Loading.hourglass({
    cssAnimationDuration: 400,
    svgSize: '150px',
    svgColor: '#ff6b01',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  });

  const movies = await moviesApiService.getFilmsByName();

  const { results, total_pages } = movies;

  setTimeout(() => {
    addFilmListToContainer(results);
    moviePaginationForSearch.renderPaginationDisabled(
      document.querySelector('.pagination-list'),
      total_pages, moviesApiService.page 
    );

    for (let i = 0; i < document.querySelector('.pagination-list').childNodes.length; i += 1){
      const number = parseInt(document.querySelector('.pagination-list').childNodes[i].firstChild.textContent)
      if (number >= moviePaginationForSearch.currentPage && number <= moviesApiService.page) {
      if (document.querySelector('.pagination-list').childNodes[i].classList.contains('active')) {
        document.querySelector('.pagination-list').childNodes[i].classList.remove('active')
      }
      document.querySelector('.pagination-list').childNodes[i].classList.add('loaded')
      }
    }
    Loading.remove();
  }, 500);

}

function onPaginationSearchHandler(event) {
  if (
    event.target.parentNode.classList.contains('pagination-prev') ||
    event.target.classList.contains('pagination-prev')
  ) {
    moviePaginationForSearch.prevPage();
  }
  if (
    event.target.parentNode.classList.contains('pagination-next') ||
    event.target.classList.contains('pagination-next')
  ) {
    moviePaginationForSearch.nextPage();
  }
  if (
    event.target.parentNode.classList.contains('pagination-number') &&
    !event.target.parentNode.classList.contains('active')
  ) {
    const clickPage = parseInt(event.target.textContent);
    moviePaginationForSearch.currentPage = clickPage;
  }
  if (
    event.target.classList.contains('pagination-number') &&
    !event.target.classList.contains('active')
  ) {
    const clickPage = parseInt(event.target.childNodes[0].textContent);
    moviePaginationForSearch.currentPage = clickPage;
  }
}
