export const addToStorage = (key, value) => {
  try {
    if (typeof value === 'string') {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(error);
  }
};

export const getFromStorage = key => {
  if (typeof key === 'string') {
    return localStorage.getItem(key);
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
};

export const removeFromStorage = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
