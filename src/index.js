//import { data } from "./js/data.js";
//import * as bootstrap from 'bootstrap'

import './scss/style.scss';
import './yupLocale.js';
import validate from './validator';
import uniqueId from 'lodash/uniqueId';
import onChange from 'on-change';
import renderForm from './view/renderForm.js';
import renderFeeds from './view/renderFeeds.js';
import renderModal from './view/renderModal.js';
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
    },
    viewedPostIds: new Set(),
    currentModalPostId: null,
};

const form = document.querySelector('.rss-form');
const posts = document.querySelector('.posts');

const watchedState = onChange(state, function (path) {
  // автообновление формы
  if (path.startsWith('formState')) {
    renderForm(this);
  }

  // автообновление фидов и постов
  if (path.startsWith('postData') || path.startsWith('feedData')) {
    renderFeeds(this);
  }

  if (path.startsWith('currentModalPostId')) {
    renderModal(this);
  }

  if (path.startsWith('viewedPostIds')) {
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
      const { feed, posts } = data;
      const fullFeed = { ...feed, url: value };
      watchedState.feedData.push(fullFeed);
      watchedState.postData.push(...posts);
      watchedState.feedsUrls.push({ id: uniqueId('url_'), url: value });
      watchedState.formState.isValid = true;
      
      watchedState.formState.inputData = '';
      const input = form.querySelector('.form-control');
      input.value = '';
      input.focus();
    })
    .catch((error) => {
      console.error('Ошибка загрузки RSS:', error);
      const key = getErrorKey(error);
      watchedState.formState.errorType = key;
      watchedState.formState.isValid = false;
    })
});

function checkFeedsPeriodically() {
  const requests = watchedState.feedsUrls.map((feedInfo) => {
    const feed = watchedState.feedData.find((f) => f.url === feedInfo.url);
    if (!feed) return Promise.resolve(); 

    return fetchUrl(feedInfo.url)
      .then((response) => parse(response, feed.id)) // передаём старый id
      .then(({ posts }) => {
        const existingLinks = watchedState.postData.map(post => post.link);
        const newPosts = posts.filter(post => !existingLinks.includes(post.link));
        if (newPosts.length > 0) {
          watchedState.postData = [...watchedState.postData, ...newPosts];
        }
      })
      .catch((error) => {
        console.error('Ошибка обновления фида:', error);
        const key = getErrorKey(error);
        watchedState.formState.errorType = key;
        watchedState.formState.isValid = false;
      });
  });

  Promise.all(requests).finally(() => {
    setTimeout(checkFeedsPeriodically, 5000);
  });

  posts.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-id]');
    if (link) {
      const id = link.dataset.id;
      watchedState.viewedPostIds.add(id);
      return;
    }

    const button = e.target.closest('button[data-bs-toggle="modal"]');
    if (!button) return;
  
    const id = button.dataset.id;
    watchedState.viewedPostIds.add(id); 
    watchedState.currentModalPostId = id;
  });
}

checkFeedsPeriodically();