import { currentDataMovie, currentId } from './modal_details';
import { addToStorage, getFromStorage, removeFromStorage } from './storage';
export { checkStorage, movieIsInWatched, movieIsInQueue, clickToWatched, clickToQueue };

let dataFilmsByWatched = [];
let dataFilmsByQueue = [];

const checkStorage = () => {
  if (getFromStorage('dataFilmsByWatched')) {
    dataFilmsByWatched = getFromStorage('dataFilmsByWatched');
  }

  if (getFromStorage('dataFilmsByQueue')) {
    dataFilmsByQueue = getFromStorage('dataFilmsByQueue');
  }
};

const movieIsInWatched = refBtnWatched => {
  if (getFromStorage('dataFilmsByWatched')) {
    dataFilmsByWatched = getFromStorage('dataFilmsByWatched');
    if (dataFilmsByWatched.some(data => data.id === currentId )) {
      refBtnWatched.classList.add('movie-data__button_active');
    }
  }
};

const movieIsInQueue = refBtnQueue => {
  if (getFromStorage('dataFilmsByQueue')) {
    dataFilmsByQueue = getFromStorage('dataFilmsByQueue');
    if (dataFilmsByQueue.some(data => data.id === currentId )) {
      refBtnQueue.classList.add('movie-data__button_active');
    }
  }
};

const clickToWatched = event => {
  if(event.target.dataset.btn === 'watched'){
    const refBtnQueue = event.target.closest('li').nextElementSibling.firstElementChild;
    event.target.classList.toggle('movie-data__button_active');
    if (event.target.classList.contains('movie-data__button_active')) {
      if (dataFilmsByWatched.some(data => data.id === currentId)) {
        return;
      }
      console.log(dataFilmsByWatched.some( data => data.id === currentId ))
      dataFilmsByWatched.push(currentDataMovie);
      addToStorage('dataFilmsByWatched', dataFilmsByWatched);
      if (dataFilmsByQueue.some(data => data.id === currentId)) {
        const currentIndex = dataFilmsByQueue.findIndex(data => data.id === currentId);
        dataFilmsByQueue.splice(currentIndex, 1);
        addToStorage('dataFilmsByQueue', dataFilmsByQueue);
        refBtnQueue.classList.toggle('movie-data__button_active');
      }
    }
    else {
      const currentIndex = dataFilmsByWatched.findIndex(data => data.id === currentId);
      dataFilmsByWatched.splice(currentIndex, 1);
      addToStorage('dataFilmsByWatched', dataFilmsByWatched);
      
    }
  } 
};

const clickToQueue = event => {
  if(event.target.dataset.btn === 'queue'){
    const refBtnWatched = event.target.closest('li').previousElementSibling.firstElementChild;
    event.target.classList.toggle('movie-data__button_active');
    if (event.target.classList.contains('movie-data__button_active')) {
      if (dataFilmsByQueue.some(data => data.id === currentId)) {
        return;
      }    
      dataFilmsByQueue.push(currentDataMovie);
      addToStorage('dataFilmsByQueue', dataFilmsByQueue);
      if (dataFilmsByWatched.some(data => data.id === currentId)) {
        const currentIndex = dataFilmsByWatched.findIndex(data => data.id === currentId);
        dataFilmsByWatched.splice(currentIndex, 1);
        addToStorage('dataFilmsByWatched', dataFilmsByWatched);
        refBtnWatched.classList.toggle('movie-data__button_active');
      }
    }
    else {
      const currentIndex = dataFilmsByQueue.findIndex(data => data.id === currentId);
      dataFilmsByQueue.splice(currentIndex, 1);
      addToStorage('dataFilmsByQueue', dataFilmsByQueue);    
    }
  }
};

