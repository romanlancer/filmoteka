export { checkMovieInQueue, checkMovieInWatched, checkStorageLibrary, movieIsInWatchedInModal, movieIsInQueueInModal, clickToWatchedInModal, clickToQueueInModal, clickToWatchedOnCard, clickToQueueOnCard };
import { currentDataMovie, currentId } from './modal_details';
import { addToStorage, getFromStorage, removeFromStorage } from './storage';

let dataFilmsByWatched = [];
let dataFilmsByQueue = [];

const checkStorageLibrary = () => {
  if (getFromStorage('dataFilmsByWatched')) {
    dataFilmsByWatched = getFromStorage('dataFilmsByWatched');
  }

  if (getFromStorage('dataFilmsByQueue')) {
    dataFilmsByQueue = getFromStorage('dataFilmsByQueue');
  }
};

const movieIsInWatchedInModal = refBtnWatched => {
  if (getFromStorage('dataFilmsByWatched')) {
    dataFilmsByWatched = getFromStorage('dataFilmsByWatched');
    if (dataFilmsByWatched.includes(currentId )) {
      refBtnWatched.classList.add('movie-data__button_active');
    }
  }
};

const movieIsInQueueInModal = refBtnQueue => {
  if (getFromStorage('dataFilmsByQueue')) {
    dataFilmsByQueue = getFromStorage('dataFilmsByQueue');
    if (dataFilmsByQueue.includes(currentId )) {
      refBtnQueue.classList.add('movie-data__button_active');
    }
  }
};

const checkMovieInWatched = currentId => {
  if (getFromStorage('dataFilmsByWatched')){
    if (dataFilmsByWatched.includes(currentId )) {
      return 'movie-data__button movie-data__button_inactive cards__item-btn movie-data__button_active';
    }
    
  } else {
  }
  return 'movie-data__button movie-data__button_inactive cards__item-btn';
}

const checkMovieInQueue = currentId => {
  if (getFromStorage('dataFilmsByQueue')){
    if (dataFilmsByQueue.includes(currentId )) {
      return 'movie-data__button movie-data__button_inactive cards__item-btn movie-data__button_active';
    }
    
  } else {
  }
  return 'movie-data__button movie-data__button_inactive cards__item-btn';
}

const clickToWatchedInModal = event => {
  if(event.target.dataset.btn === 'watched'){
    const refBtnQueue = event.target.closest('li').nextElementSibling.firstElementChild;
    event.target.classList.toggle('movie-data__button_active');
    if (event.target.classList.contains('movie-data__button_active')) {
      if (dataFilmsByWatched.includes(currentId)) {
        return;
      }     
      dataFilmsByWatched.push(currentId);
      addToStorage('dataFilmsByWatched', dataFilmsByWatched);
      if (dataFilmsByQueue.includes(currentId)) {
        const currentIndex = dataFilmsByQueue.indexOf(currentId);
        dataFilmsByQueue.splice(currentIndex, 1);
        addToStorage('dataFilmsByQueue', dataFilmsByQueue);
        refBtnQueue.classList.toggle('movie-data__button_active');
      }
    }
    else {
      const currentIndex = dataFilmsByWatched.indexOf(currentId);
      dataFilmsByWatched.splice(currentIndex, 1);
      addToStorage('dataFilmsByWatched', dataFilmsByWatched);
      
    }
  } 
};

const clickToQueueInModal = event => {
  if(event.target.dataset.btn === 'queue'){
    const refBtnWatched = event.target.closest('li').previousElementSibling.firstElementChild;
    event.target.classList.toggle('movie-data__button_active');
    if (event.target.classList.contains('movie-data__button_active')) {
      if (dataFilmsByQueue.includes(currentId)) {
        return;
      }    
      dataFilmsByQueue.push(currentId);
      addToStorage('dataFilmsByQueue', dataFilmsByQueue);
      if (dataFilmsByWatched.includes(currentId)) {
        const currentIndex = dataFilmsByWatched.indexOf(currentId);
        dataFilmsByWatched.splice(currentIndex, 1);
        addToStorage('dataFilmsByWatched', dataFilmsByWatched);
        refBtnWatched.classList.toggle('movie-data__button_active');
      }
    }
    else {
      const currentIndex = dataFilmsByQueue.indexOf(currentId);
      dataFilmsByQueue.splice(currentIndex, 1);
      addToStorage('dataFilmsByQueue', dataFilmsByQueue);    
    }
  }
};

const clickToWatchedOnCard = async event => {
  if (event.target.dataset.btn === 'watched') {  
    const refBtnQueue = event.target.closest('li').nextElementSibling.firstElementChild;    
    event.target.classList.toggle('movie-data__button_active');
    const cardsId = event.target.closest('ul').closest('li').id;    
    if (event.target.classList.contains('movie-data__button_active')) {
      event.target.textContent = 'remove from watched';
      if (dataFilmsByWatched.includes(currentId)) {
        return;
      }   
      dataFilmsByWatched.push(cardsId);
      addToStorage('dataFilmsByWatched', dataFilmsByWatched);      
      if (dataFilmsByQueue.includes(cardsId)) {          
        const currentIndex = dataFilmsByQueue.indexOf(cardsId);
        dataFilmsByQueue.splice(currentIndex, 1);
        addToStorage('dataFilmsByQueue', dataFilmsByQueue);
        refBtnQueue.classList.toggle('movie-data__button_active');
        refBtnQueue.textContent = 'add to queue'
      }       
    } else {
      const currentIndex = dataFilmsByWatched.indexOf(cardsId);
      dataFilmsByWatched.splice(currentIndex, 1);
      addToStorage('dataFilmsByWatched', dataFilmsByWatched);
      event.target.textContent = 'add to watched';      
    }
  }
}

const clickToQueueOnCard = async event => {
  if (event.target.dataset.btn === 'queue') {       
    const refBtnWatched = event.target.closest('li').previousElementSibling.firstElementChild;    
    event.target.classList.toggle('movie-data__button_active');
    const cardsId = event.target.closest('ul').closest('li').id;    
    if (event.target.classList.contains('movie-data__button_active')) {
      event.target.textContent = 'remove from queue';
      if (dataFilmsByQueue.includes(currentId)) {
        return;
      } 
      dataFilmsByQueue.push(data);
      addToStorage('dataFilmsByQueue', dataFilmsByQueue);        
      if (dataFilmsByWatched.includes(cardsId)) {          
        const currentIndex = dataFilmsByWatched.indexOf(cardsId);
        dataFilmsByWatched.splice(currentIndex, 1);
        addToStorage('dataFilmsByWatched', dataFilmsByWatched);
        refBtnWatched.classList.toggle('movie-data__button_active');
        refBtnWatched.textContent = 'add to watched';
      }          
    } else {
      const currentIndex = dataFilmsByQueue.indexOf(cardsId);
      dataFilmsByQueue.splice(currentIndex, 1);
      addToStorage('dataFilmsByQueue', dataFilmsByQueue);
      event.target.textContent = 'add to queue';
      
    }
  }
}
