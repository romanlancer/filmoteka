import { Loading } from 'notiflix/build/notiflix-loading-aio';
import MoviesApiService from './fetch_api';
import Pagination from './pagination';
import { renderFilmList, addFilmListToContainer } from './filmCard';
import { paginationChangeHandler, loadMoreChangeHandler, smoothScroll } from './pagination';
import { getFromStorage } from './storage';
import debounce from 'debounce';

let currentPageWatched = 1;
let currentPageQueue = 1;
let cardsPerPage = 1;

if (window.matchMedia("(min-width: 320px)").matches) {
  cardsPerPage = 4;
}
if (window.matchMedia("(min-width: 768px)").matches) {
  cardsPerPage = 6;
}
if (window.matchMedia("(min-width: 1024px)").matches) {
  cardsPerPage = 9;
}

window.addEventListener("resize", debounce(resizeWindowHandler, 100));

function resizeWindowHandler(event) {
  const windowWidth = window.innerWidth;
  if (windowWidth <= 768) {
    cardsPerPage = 4;
  }
    if (windowWidth > 768 && windowWidth <= 1024) {
    cardsPerPage = 6;
  }
  if (windowWidth >= 1024) {
    cardsPerPage = 9;
  }
  
}

// const mediaMobileRef = window.matchMedia("(min-width: 320px)");
// const mediaTabletRef = window.matchMedia("(min-width: 768px)");
// const mediaDesktopRef = window.matchMedia("(min-width: 1024px)");

// mediaMobileRef.addEventListener('change', screenMobileHandler);
// mediaTabletRef.addEventListener('change', screenTabletHandler);
// mediaDesktopRef.addEventListener('change', screenDesktopHandler);

// function screenMobileHandler(event) {
//   if(event.matches)console.log('mobile');
// }
// function screenTabletHandler(event) {
//   if(event.matches)console.log('tablet');
// }
// function screenDesktopHandler(event) {
//   if(event.matches)console.log('desktop');
// }
// if (window.matchMedia("(min-width: 320px)").matches) {
//   cardsPerPage = 4;
//   console.log('screen 320');
// }
// if (window.matchMedia("(min-width: 768px)").matches) {
//   cardsPerPage = 6;
//    console.log('screen 768');
// }
// if (window.matchMedia("(min-width: 1024px)").matches) {
//   cardsPerPage = 9;
//    console.log('screen 1024');
// }


const moviePaginationForWatched = new Pagination({
  initialPage: 1,
  total: 1,
  onChange(value) {
    handlePageChangeWatched(value, cardsPerPage);
  },
});

const moviePaginationForQueue = new Pagination({
  initialPage: 1,
  total: 1,
  onChange(value) {
    handlePageChangeQueue(value, cardsPerPage, []);
  },
});



export function renderWatched(page) {
  if(page) moviePaginationForWatched.currentPage = page;
  else moviePaginationForWatched.currentPage = currentPageWatched;
    
} 

export function renderQueue(page) {
  if(page) moviePaginationForQueue.currentPage = page;
  else moviePaginationForQueue.currentPage = currentPageQueue;
} 



function handlePageChangeWatched(page, elPerPage) {
  currentPageWatched = page;
  const watchedFilms = getFromStorage('dataFilmsByWatched') ?? [];

  watchedFilms.forEach((data) => {
    data.genre_ids = data.genres.map((data) => {
      return data.id;
    })
  });
  const totalPages = Math.ceil(watchedFilms.length / elPerPage);
  moviePaginationForWatched.total = totalPages;
  const FilmsForRender = watchedFilms.slice((page - 1) * elPerPage, page * elPerPage);
  Loading.hourglass({
    cssAnimationDuration: 400,
    svgSize: '150px',
    svgColor: '#ff6b01',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  });
  setTimeout(() => {
    renderFilmList(FilmsForRender);
    moviePaginationForWatched.renderPaginationDisabled(
      document.querySelector('.pagination-list'),
      totalPages,
      page,
  );
  moviePaginationForWatched.renderPaginationLoadMore(
      document.querySelector('.pagination'),
      page,
      getFromStorage('language'),
    );
  paginationChangeHandler(onPaginationWatchedHandler);
    loadMoreChangeHandler(onLoadMoreWatchedHandler);
    Loading.remove();
  }, 300);

}

function onLoadMoreWatchedHandler(event) {
  currentPageWatched += 1;

  const watchedFilms = getFromStorage('dataFilmsByWatched') ?? [];
  watchedFilms.forEach((data) => {
    data.genre_ids = data.genres.map((data) => {
      return data.id;
    })
  });
  const totalPages = Math.ceil(watchedFilms.length / cardsPerPage);
  const FilmsForRender = watchedFilms.slice((currentPageWatched - 1) * cardsPerPage, currentPageWatched * cardsPerPage);
  Loading.hourglass({
    cssAnimationDuration: 400,
    svgSize: '150px',
    svgColor: '#ff6b01',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  });
  setTimeout(() => {
    addFilmListToContainer(FilmsForRender);
    moviePaginationForWatched.renderPaginationDisabled(
        document.querySelector('.pagination-list'),
        totalPages,
        currentPageWatched,
    );
    moviePaginationForWatched.renderPaginationLoadMore(
        document.querySelector('.pagination'),
        currentPageWatched,
        getFromStorage('language'),
    );
    loadMoreChangeHandler(onLoadMoreWatchedHandler);  

    for (let i = 0; i < document.querySelector('.pagination-list').childNodes.length; i += 1) {
        const number = parseInt(
          document.querySelector('.pagination-list').childNodes[i].firstChild.textContent,
        );
        if (number >= moviePaginationForWatched.currentPage && number <= currentPageWatched) {
          if (document.querySelector('.pagination-list').childNodes[i].classList.contains('active')) {
            document.querySelector('.pagination-list').childNodes[i].classList.remove('active');
          }
          document.querySelector('.pagination-list').childNodes[i].classList.add('loaded');
        }
    }
    Loading.remove();
  }, 300);
  
}

function onPaginationWatchedHandler(event) {
 smoothScroll();
  if (
    event.target.parentNode.classList.contains('pagination-prev') ||
    event.target.classList.contains('pagination-prev')
  ) {
    moviePaginationForWatched.prevPage();
  }
  if (
    event.target.parentNode.classList.contains('pagination-next') ||
    event.target.classList.contains('pagination-next')
  ) {
    moviePaginationForWatched.nextPage();
  }
  if (
    event.target.parentNode.classList.contains('pagination-number') &&
    !event.target.parentNode.classList.contains('active')
  ) {
    const clickPage = parseInt(event.target.textContent);
    moviePaginationForWatched.currentPage = clickPage;
  }
  if (
    event.target.classList.contains('pagination-number') &&
    !event.target.classList.contains('active')
  ) {
    const clickPage = parseInt(event.target.childNodes[0].textContent);
    moviePaginationForWatched.currentPage = clickPage;
  }
}


function handlePageChangeQueue(page, elPerPage, arrFilms) {
   currentPageQueue = page;
  const totalPages = Math.ceil(arrFilms.length / elPerPage);
  moviePaginationForQueue.total = totalPages;

  const FilmsForRender = arrFilms.slice((page - 1) * elPerPage, page * elPerPage);

  renderFilmList(FilmsForRender);
  moviePaginationForWatched.renderPaginationDisabled(
      document.querySelector('.pagination-list'),
      totalPages,
      page,
  );
  moviePaginationForWatched.renderPaginationLoadMore(
      document.querySelector('.pagination'),
      page,
      getFromStorage('language'),
    );
  // paginationChangeHandler(onPaginationWatchedHandler);
  // loadMoreChangeHandler(onLoadMoreWatchedHandler);
}