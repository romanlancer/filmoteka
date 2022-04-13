import { filmCard, renderFilmList } from './filmCard';
import { currentDataMovie, currentId } from './modal_details';
import { addIdMovieToStorage, getIdMovieFromStorage, removeIdMovieFromStorage } from './storage';
import MoviesApiService from './fetch_api';

let idsByWatched = [];
let idsByQueue = [];

export const checkStorage = () => {
    if (getIdMovieFromStorage('idsByWatched')) {
        idsByWatched = getIdMovieFromStorage('idsByWatched');       
    }
    
    if (getIdMovieFromStorage('idsByQueue')) {
        idsByQueue = getIdMovieFromStorage('idsByQueue');       
    }    
}

export const movieIsInWatched = (refBtnWatched) => {
    if (getIdMovieFromStorage('idsByWatched')) {
        idsByWatched = getIdMovieFromStorage('idsByWatched');
        if (idsByWatched.includes(currentId)) {
            refBtnWatched.classList.add('movie-data__button_active');        
        }
    }
}

export const movieIsInQueue = (refBtnQueue) => {
    if (getIdMovieFromStorage('idsByQueue')) {
        idsByQueue = getIdMovieFromStorage('idsByQueue');
        if (idsByQueue.includes(currentId)) {
            refBtnQueue.classList.add('movie-data__button_active');            
        }
    }
}

export const clickToWatched = (event) => {    
    event.target.classList.toggle('movie-data__button_active');
    if (event.target.classList.contains('movie-data__button_active')) {
        if (idsByWatched.includes(currentId)) {
            return;
        }        
        idsByWatched.push(currentId);
        addIdMovieToStorage('idsByWatched', idsByWatched);
    } else {         
        const currentIndex = idsByWatched.indexOf(currentId);
        idsByWatched.splice(currentIndex, 1);
        addIdMovieToStorage('idsByWatched', idsByWatched);
        console.log(currentId)
    }
    // if (idsByQueue.includes(currentId)) {
    //     const currentIndex = idsByQueue.indexOf(currentId);        
    //     idsByQueue.splice(currentIndex, 1);
    //     addIdMovieToStorage('idsByQueue', idsByQueue);
    // }    
}

export const clickToQueue = (event) => {
        event.target.classList.toggle('movie-data__button_active');
    if (event.target.classList.contains('movie-data__button_active')) {
        if (idsByQueue.includes(currentId)) {
            return;
        }        
        idsByQueue.push(currentId);
        addIdMovieToStorage('idsByQueue', idsByQueue);        
    } else {        
        const currentIndex = idsByQueue.indexOf(currentId);
        idsByQueue.splice(currentIndex, 1);
        addIdMovieToStorage('idsByQueue', idsByQueue);
    }
    //     if (idsByWatched.includes(currentId)) {
    //     const currentIndex = idsByWatched.indexOf(currentId);
    //     idsByWatched.splice(currentIndex, 1);
    //     addIdMovieToStorage('idsByWatched', idsByWatched);
    // }
}


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






