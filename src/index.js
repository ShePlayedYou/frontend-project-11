// import { data } from "./js/data.js";
// import * as bootstrap from 'bootstrap'

import './scss/style.scss'
import './yupLocale.js'
import validate from './validator'
import uniqueId from 'lodash/uniqueId'
import prepareParsedData from './prepareParsedData.js'
import createWatchedState from './createWatchedState.js'
import fetchUrl from './fetch.js'
import parse from './parser.js'
import i18next from 'i18next'
import resources from './locales/index.js'

i18next.init({
  lng: 'ru',
  debug: false,
  resources,
})

const state = {
  feedsUrls: [],
  feedData: [],
  postData: [],
  formState: {
    errorType: null,
    isValid: null,
  },
  viewedPostIds: new Set(),
  currentModalPostId: null,
}

const form = document.querySelector('.rss-form')
const posts = document.querySelector('.posts')

const watchedState = createWatchedState(state)

const loadRss = (value, watchedState, form) => {
  return fetchUrl(value)
    .then(response => parse(response))
    .then(rawParsed => prepareParsedData(rawParsed))
    .then((data) => {
      const { feed, posts } = data
      const fullFeed = { ...feed, url: value }
      watchedState.feedData.push(fullFeed)
      watchedState.postData.push(...posts)
      watchedState.feedsUrls.push({ id: uniqueId('url_'), url: value })
      watchedState.formState.isValid = true

      const input = form.querySelector('.form-control')
      input.value = ''
      input.focus()
    })
    .catch((error) => {
      console.error('Error loading RSS:', error)
      throw error
    })
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(e.target)
  const value = data.get('url')
  const existingUrls = watchedState.feedsUrls.map(feed => feed.url)

  validate({ url: value }, existingUrls)
    .then(() => loadRss(value, watchedState, form))
    .catch((error) => {
      console.error('Error loading RSS:', error)
      watchedState.formState.errorType = error.message
      watchedState.formState.isValid = false
    })
})

function checkFeedsPeriodically() {
  const requests = watchedState.feedsUrls.map((feedInfo) => {
    const feed = watchedState.feedData.find(f => f.url === feedInfo.url)
    if (!feed) return Promise.resolve()

    return fetchUrl(feedInfo.url)
      .then(response => parse(response))
      .then(rawParsed => prepareParsedData(rawParsed, feed.id))
      .then(({ posts }) => {
        const existingLinks = watchedState.postData.map(post => post.link)
        const newPosts = posts.filter(post => !existingLinks.includes(post.link))
        if (newPosts.length > 0) {
          watchedState.postData = [...watchedState.postData, ...newPosts]
        }
      })
      .catch((error) => {
        watchedState.formState.errorType = error.message
        watchedState.formState.isValid = false
      })
  })

  Promise.all(requests).finally(() => {
    setTimeout(checkFeedsPeriodically, 5000)
  })

  posts.addEventListener('click', (e) => {
    const target = e.target.closest('[data-id]')
    if (!target) return
    const id = target.dataset.id
    watchedState.viewedPostIds.add(id)
    if (target.matches('button[data-bs-toggle="modal"]')) {
      watchedState.currentModalPostId = id
    }
  })
}

checkFeedsPeriodically()
