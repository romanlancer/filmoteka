export {
  checkMovieInQueue, checkMovieInWatched, checkStorageLibrary,
  movieIsInWatchedInModal, movieIsInQueueInModal, clickToWatchedInModal,
  clickToQueueInModal, clickToWatchedOnCard, clickToQueueOnCard,
  checkLanguageBtnW, checkLanguageBtnQ
};
import { currentDataMovie, currentId } from './modal_details';
import { addToStorage, getFromStorage, removeFromStorage } from './storage';
import { choiceMainRender } from './render_utils';

let dataFilmsByWatched = [];
let dataFilmsByQueue = [];
// const checkActiveBtn = event.target.classList.contains('movie-data__button_active')

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
      refBtnWatched.textContent = checkLanguageBtnW(currentId);
    }
  }
};

const movieIsInQueueInModal = refBtnQueue => {
  if (getFromStorage('dataFilmsByQueue')) {
    dataFilmsByQueue = getFromStorage('dataFilmsByQueue');
    if (dataFilmsByQueue.includes(currentId )) {
      refBtnQueue.classList.add('movie-data__button_active');
      refBtnQueue.textContent = checkLanguageBtnQ(currentId);
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
  if (event.target.dataset.btn === 'watched') {
    // console.log(currentId)
    const refBtnQueue = event.target.closest('li').nextElementSibling.firstElementChild;
    event.target.classList.toggle('movie-data__button_active');
    if (event.target.classList.contains('movie-data__button_active')) {
      if (dataFilmsByWatched.includes(currentId)) {
        return;
      }     
      dataFilmsByWatched.push(currentId);
      addToStorage('dataFilmsByWatched', dataFilmsByWatched);
      event.target.textContent = checkLanguageBtnW(currentId);
      if (dataFilmsByQueue.includes(currentId)) {
        const currentIndex = dataFilmsByQueue.indexOf(currentId);
        dataFilmsByQueue.splice(currentIndex, 1);
        addToStorage('dataFilmsByQueue', dataFilmsByQueue);
        refBtnQueue.classList.toggle('movie-data__button_active');
        refBtnQueue.textContent = checkLanguageBtnQ(currentId);
      }
    }
    else {
      const currentIndex = dataFilmsByWatched.indexOf(currentId);
      dataFilmsByWatched.splice(currentIndex, 1);
      addToStorage('dataFilmsByWatched', dataFilmsByWatched);
      event.target.textContent = checkLanguageBtnW(currentId);
      
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
      event.target.textContent = checkLanguageBtnQ(currentId);
      if (dataFilmsByWatched.includes(currentId)) {
        const currentIndex = dataFilmsByWatched.indexOf(currentId);
        dataFilmsByWatched.splice(currentIndex, 1);
        addToStorage('dataFilmsByWatched', dataFilmsByWatched);
        refBtnWatched.classList.toggle('movie-data__button_active');
        refBtnWatched.textContent = checkLanguageBtnW(currentId);
      }
    }
    else {
      const currentIndex = dataFilmsByQueue.indexOf(currentId);
      dataFilmsByQueue.splice(currentIndex, 1);
      addToStorage('dataFilmsByQueue', dataFilmsByQueue);
      event.target.textContent = checkLanguageBtnQ(currentId);
    }
  }
};

const clickToWatchedOnCard = async event => {
  if (event.target.dataset.btn === 'watched') {
    const refBtnQueue = event.target.closest('li').nextElementSibling.firstElementChild;    
    event.target.classList.toggle('movie-data__button_active');
    const cardsId = +event.target.closest('ul').closest('li').id;    
    // console.log((dataFilmsByWatched.includes(cardsId)))
    if (event.target.classList.contains('movie-data__button_active')) {
      if (dataFilmsByWatched.includes(currentId)) {
        return;
      }   
      dataFilmsByWatched.push(cardsId);
      addToStorage('dataFilmsByWatched', dataFilmsByWatched);      
      event.target.textContent = checkLanguageBtnW(cardsId);
      if (dataFilmsByQueue.includes(cardsId)) {          
        const currentIndex = dataFilmsByQueue.indexOf(cardsId);
        dataFilmsByQueue.splice(currentIndex, 1);
        addToStorage('dataFilmsByQueue', dataFilmsByQueue);
        refBtnQueue.classList.toggle('movie-data__button_active');
        refBtnQueue.textContent = checkLanguageBtnQ(cardsId);
              if (getFromStorage('mainState') === "Library") {
        choiceMainRender();
      }   
      }       
    } else {
      const currentIndex = dataFilmsByWatched.indexOf(cardsId);
      dataFilmsByWatched.splice(currentIndex, 1);
      addToStorage('dataFilmsByWatched', dataFilmsByWatched);
      event.target.textContent = checkLanguageBtnW(cardsId);
      if (getFromStorage('mainState') === "Library") {
        choiceMainRender();
      }   
    }
  }
}

const clickToQueueOnCard = async event => {
  if (event.target.dataset.btn === 'queue') {       
    const refBtnWatched = event.target.closest('li').previousElementSibling.firstElementChild;    
    event.target.classList.toggle('movie-data__button_active');
    const cardsId = +event.target.closest('ul').closest('li').id;    
    if (event.target.classList.contains('movie-data__button_active')) {
      if (dataFilmsByQueue.includes(cardsId)) {
        return;
      } 
      dataFilmsByQueue.push(cardsId);
      addToStorage('dataFilmsByQueue', dataFilmsByQueue);        
      event.target.textContent = checkLanguageBtnQ(cardsId);
      if (dataFilmsByWatched.includes(cardsId)) {          
        const currentIndex = dataFilmsByWatched.indexOf(cardsId);
        dataFilmsByWatched.splice(currentIndex, 1);
        addToStorage('dataFilmsByWatched', dataFilmsByWatched);
        refBtnWatched.classList.toggle('movie-data__button_active');
        refBtnWatched.textContent = checkLanguageBtnW(cardsId);
              if (getFromStorage('mainState') === "Library") {
        choiceMainRender();
      }   
      }          
    } else {
      const currentIndex = dataFilmsByQueue.indexOf(cardsId);
      dataFilmsByQueue.splice(currentIndex, 1);
      addToStorage('dataFilmsByQueue', dataFilmsByQueue);
      event.target.textContent = checkLanguageBtnQ(cardsId);
      if (getFromStorage('mainState') === "Library") {
        choiceMainRender();
      }      
    }
  }
}
  
  const checkLanguageBtnW = (id) => {
  if (dataFilmsByWatched.includes(id)) {
    return getFromStorage('language') === 'uk' ? 'видалити з переглянутих' : 'remove from watched';
  } else {
    return getFromStorage('language') === 'uk' ? 'Переглянуті' : 'add to watched';
  }
}

const checkLanguageBtnQ = (id) => {
  if (dataFilmsByQueue.includes(id)) {
    return getFromStorage('language') === 'uk' ? 'видалити з черги' : 'remove from queue';
  } else {
    return getFromStorage('language') === 'uk' ? 'Подивитися' : 'add to queue';
  }
}