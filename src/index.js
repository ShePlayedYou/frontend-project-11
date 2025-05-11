//import { data } from "./js/data.js";
//import * as bootstrap from 'bootstrap'
/* global document, console */

import './scss/style.scss';
import './yupLocale.js';
import validate from './validator';
import uniqueId from 'lodash/uniqueId';
import renderForm from './view/renderForm.js';
import parseUrl from './parser';

import i18next from 'i18next';
import resources from './locales/index.js';



i18next.init({
  lng: 'ru',
  debug: false,
  resources,
});

const state = {
    feedsUrls: [],
    feedData: [],
    formState: {
        inputData: '',
        errorType: null,
        isValid: null,
    }
};

const form = document.querySelector('.rss-form');

form.addEventListener("input", (e) => {
    state.formState.inputData = e.target.value;
  });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = state.formState.inputData;

  const isUniqUrl = state.feedsUrls.some(feed => feed.url === value);
  if (isUniqUrl) {
    state.formState.isValid = false;
    state.formState.errorType = 'form.notUnique';
    renderForm(state); // рендер с ошибкой
    return;
  };

  validate({ url: value })
    .then(() => parseUrl(value))
    .then((data) => {

      state.feedData.push(data);

      state.feedsUrls.push({id: uniqueId('url_'), url: value});
      state.formState.isValid = true;
      console.log(state.feedData)

      renderForm(state) // рендер формы 
      state.formState.inputData = '';
      const input = form.querySelector('.form-control'); 
      input.value = '';
      input.focus();
      return Promise.resolve(); // доделать renderPosts(state) !!! и перевести в on-change 
    })
    .catch((error) => {
      console.error('Ошибка загрузки RSS:', error);
      state.formState.errorType = 'invalid';
      const key = error.message?.key || 'form.invalid';
      state.formState.errorType = key;
      state.formState.isValid = false;

      renderForm(state) // рендер с ошибкой
    })
});
