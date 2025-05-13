//import { data } from "./js/data.js";
//import * as bootstrap from 'bootstrap'
/* global document, console */

import './scss/style.scss';
import './yupLocale.js';
import validate from './validator';
import uniqueId from 'lodash/uniqueId';
import onChange from 'on-change';
import renderForm from './view/renderForm.js';
import renderFeeds from './view/renderFeeds.js';
import fetchUrl from './fetch.js'; 
import parse from './parser.js';
import getErrorKey from './getErrorKey.js';

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
    postData: [],
    formState: {
        inputData: '',
        errorType: null,
        isValid: null,
    }
};

const form = document.querySelector('.rss-form');

const watchedState = onChange(state, function (path) {
  console.log(path, ' PATH ')
  // автообновление формы
  if (path.startsWith('formState')) {
    renderForm(this);
  }

  // автообновление фидов и постов
  if (
    path === 'feedData' || path.startsWith('feedData.') ||
    path === 'postData' || path.startsWith('postData.')
  ) {
    renderFeeds(this);
  }
});

form.addEventListener("input", (e) => {
    watchedState.formState.inputData = e.target.value;
  });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = watchedState.formState.inputData;

  const isUniqUrl = watchedState.feedsUrls.some(feed => feed.url === value);
  if (isUniqUrl) {
    watchedState.formState.isValid = false;
    watchedState.formState.errorType = 'form.notUnique';
    return;
  };

  validate({ url: value })
    .then(() => fetchUrl(value))
    .then((response) => parse(response))
    .then((data) => {
      console.log(data, 'data feed and posts')
      const { feed, posts } = data;
      watchedState.feedData.push(feed);
      watchedState.postData.push(...posts);
      console.log(state.feedData, 'state.feedData')
      console.log(state.postData, 'state.postData')
      watchedState.feedsUrls.push({ id: uniqueId('url_'), url: value });
      watchedState.formState.isValid = true;
      console.log(state.feedData, 'feedData')
      
      watchedState.formState.inputData = '';
      const input = form.querySelector('.form-control');
      input.value = '';
      input.focus();
      // доделать renderPosts(state) и перевести в on-change и подготовить модальное окно - готово
      // разделить посты и фиды на два рендера - две сущности
    })
    .catch((error) => {
      console.error('Ошибка загрузки RSS:', error);
      const key = getErrorKey(error);
      watchedState.formState.errorType = key;
      watchedState.formState.isValid = false;
    })
});
