import { filmCard, renderFilmList } from './filmCard';
import { currentDataMovie, currentId } from './modal_details';
import { addToStorage, getFromStorage, removeFromStorage } from './storage';
import MoviesApiService from './fetch_api';

let dataFilmsByWatched = [];
let dataFilmsByQueue = [];

export const checkStorage = () => {
  if (getFromStorage('dataFilmsByWatched')) {
    dataFilmsByWatched = getFromStorage('dataFilmsByWatched');
  }

  if (getFromStorage('dataFilmsByQueue')) {
    dataFilmsByQueue = getFromStorage('dataFilmsByQueue');
  }
};

export const movieIsInWatched = refBtnWatched => {
  if (getFromStorage('dataFilmsByWatched')) {
    dataFilmsByWatched = getFromStorage('dataFilmsByWatched');
    if (dataFilmsByWatched.some(data => data.id === currentId )) {
      refBtnWatched.classList.add('movie-data__button_active');
    }
  }
};

export const movieIsInQueue = refBtnQueue => {
  if (getFromStorage('dataFilmsByQueue')) {
    dataFilmsByQueue = getFromStorage('dataFilmsByQueue');
    if (dataFilmsByQueue.some(data => data.id === currentId )) {
      refBtnQueue.classList.add('movie-data__button_active');
    }
  }
};

// export const clickToWatched = event => {
//   event.target.classList.toggle('movie-data__button_active');
//   if (event.target.classList.contains('movie-data__button_active')) {
//     if (idsByWatched.includes(currentId)) {
//       return;
//     }
//     idsByWatched.push(currentId);
//     addToStorage('idsByWatched', idsByWatched);
//   } else {
//     const currentIndex = idsByWatched.indexOf(currentId);
//     idsByWatched.splice(currentIndex, 1);
//     addToStorage('idsByWatched', idsByWatched);
//     console.log(currentId);
//   }
//   // if (idsByQueue.includes(currentId)) {
//   //     const currentIndex = idsByQueue.indexOf(currentId);
//   //     idsByQueue.splice(currentIndex, 1);
//   //     addIdMovieToStorage('idsByQueue', idsByQueue);
//   // }
// };

// export const clickToQueue = event => {
//   event.target.classList.toggle('movie-data__button_active');
//   if (event.target.classList.contains('movie-data__button_active')) {
//     if (idsByQueue.includes(currentId)) {
//       return;
//     }
//     idsByQueue.push(currentId);
//     addToStorage('idsByQueue', idsByQueue);
//   } else {
//     const currentIndex = idsByQueue.indexOf(currentId);
//     idsByQueue.splice(currentIndex, 1);
//     addToStorage('idsByQueue', idsByQueue);
//   }
//   //     if (idsByWatched.includes(currentId)) {
//   //     const currentIndex = idsByWatched.indexOf(currentId);
//   //     idsByWatched.splice(currentIndex, 1);
//   //     addIdMovieToStorage('idsByWatched', idsByWatched);
//   // }
// };

export const clickToWatched = event => {
  event.target.classList.toggle('movie-data__button_active');
  if (event.target.classList.contains('movie-data__button_active')) {
    if (dataFilmsByWatched.some( data => data.id === currentId )) {
      return;
    }
    dataFilmsByWatched.push(currentDataMovie);
    addToStorage('dataFilmsByWatched', dataFilmsByWatched);
  } else {
    const currentIndex = dataFilmsByWatched.findIndex(data => data.id === currentId);
    dataFilmsByWatched.splice(currentIndex, 1);
    addToStorage('dataFilmsByWatched', dataFilmsByWatched);
    
  }
  
    
  if (idsByQueue.includes(currentId)) {
      const currentIndex = idsByQueue.indexOf(currentId);
      idsByQueue.splice(currentIndex, 1);
      addIdMovieToStorage('idsByQueue', idsByQueue);
  }
};

export const clickToQueue = event => {
  event.target.classList.toggle('movie-data__button_active');
  if (event.target.classList.contains('movie-data__button_active')) {
    if (dataFilmsByQueue.some( data => data.id === currentId )) {
      return;
    }
    dataFilmsByQueue.push(currentDataMovie);
    addToStorage('dataFilmsByQueue', dataFilmsByQueue);
  } else {
    const currentIndex = dataFilmsByQueue.findIndex(data => data.id === currentId);
    dataFilmsByQueue.splice(currentIndex, 1);
    addToStorage('dataFilmsByQueue', dataFilmsByQueue);
    
  }
  
    
  // if (idsByQueue.includes(currentId)) {
  //     const currentIndex = idsByQueue.indexOf(currentId);
  //     idsByQueue.splice(currentIndex, 1);
  //     addIdMovieToStorage('idsByQueue', idsByQueue);
  // }
};
// export const clickToQueue = event => {
//     event.target.classList.toggle('movie-data__button_active');
//     if (event.target.classList.contains('movie-data__button_active')) {
//         if()
        
//     }
// }
// const filmListQueue = [];
// const getFilmById = new MoviesApiService;

// export const renderWatched =  () => {
//     const idsByWatched = getIdMovieFromStorage('idsByWatched');
//     console.log(idsByWatched);
//     const filmListWatched = [];
//     const listFilms =  (id) => {
//         const dataMovie = await getFilmById.getFilmDetails(id);
//         // const card = filmCard(dataMovie.data);
//         console.log(dataMovie.data)

//         console.log(filmListWatched)
//     }
//     idsByWatched.map(id => { listFilms(id) });
//     console.log(filmListWatched);
// }
