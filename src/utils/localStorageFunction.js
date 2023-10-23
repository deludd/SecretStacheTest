import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_VERSION_KEY, CURRENT_VERSION } from './constants.es6';

export const getAnimeTitlesFromLocalStorage = () => {
  const storedAnimeTitles = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
  return storedAnimeTitles ? JSON.parse(storedAnimeTitles) : null;
};

export const setAnimeTitlesToLocalStorage = (titles) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(titles));
    localStorage.setItem(LOCAL_STORAGE_VERSION_KEY, CURRENT_VERSION);
  }
};

export const isAnimeTitlesUpdated = () => {
  if (typeof window !== 'undefined') {
    const storedVersion = parseInt(localStorage.getItem(LOCAL_STORAGE_VERSION_KEY) || 0);
    return storedVersion < CURRENT_VERSION;
  }
  return false;
};
