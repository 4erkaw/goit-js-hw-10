import Notiflix from "notiflix";
import { refs } from ".";

const fetchCountries = data => {
  const BASE_URL = 'https://restcountries.com/v3.1';
  return fetch(`${BASE_URL}/name/${data}?fields=name,capital,population,flags,languages`).then(res => {
    if (res.status === 404) {
      
      return Promise.reject(new Error(res.status));
    }
    return res.json();
  });
};

export { fetchCountries };
