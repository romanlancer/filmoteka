

export const addIdMovieToStorage = (key, value) => {
    try {
        if (typeof (value) === 'string') {           
            localStorage.setItem(key, value);
        } else {
            localStorage.setItem(key,  JSON.stringify(value));            
        }
    } catch(error) {
        console.error(error);        
    }
}

export const getIdMovieFromStorage = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch(error) {
        return null;
    }
}

export const removeIdMovieFromStorage = (key) => {
    try {
        localStorage.removeItem(key);        
    } catch (error) {
        console.error(error);
    }
}