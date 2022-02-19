import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
};

const inputSearch = e => {
  e.preventDefault();
  const value = e.target.value.trim();
  if (!value) {
    refs.list.innerHTML = '';
    return;
  }
  fetchCountries(value)
    .then(countries => {
      console.log(countries);
      if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      }
      if (countries.length >= 2 && countries.length <= 10) {
        renderCountries(countries);
      }
      if (countries.length === 1) {
        renderCountry(countries);
      }
    })
    .catch(() => {
      Notiflix.Notify.failure("Oops, there is no country with that name");
      refs.list.innerHTML = '';
    });
};

function createCountriesList(country) {
  return country
    .map(({ name, flags }) => {
      return `<li class="country-item">
  <img class="country-img" width="30" height="20" src="${flags.svg}" alt="${name.common}"><p class="country-name">${name.common}</p></li>`;
    })
    .join(' ');
}

function createCountry(country) {
  return country
    .map(({ name, capital, flags, languages, population }) => {
      return ` <img class="country-img-item" width="30" height="20" src="${flags.svg}" alt="${
        name.official
      }">
<p>${name.official}</p></div>
<ul class="list">
  <li class="list-item">Capital: ${capital}</li>
  <li class="list-item">Language: ${Object.values(languages).join(', ')}</li>
  <li class="list-item">Population: ${population}</li>
</ul>`;
    })
    .join(' ');
}
function renderCountries(countries) {
  refs.list.innerHTML = createCountriesList(countries);
}
function renderCountry(countries) {
  refs.list.innerHTML = createCountry(countries);
}

refs.input.addEventListener('input', debounce(inputSearch, DEBOUNCE_DELAY));
// const allLanguages = Object.values(languages);

export { refs };
