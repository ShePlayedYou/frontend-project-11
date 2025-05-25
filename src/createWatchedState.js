import onChange from 'on-change'
import renderForm from './view/renderForm'
import renderFeeds from './view/renderFeeds'
import renderPosts from './view/renderPosts'
import renderModal from './view/renderModal'
import renderViewedPostsLinks from './view/renderViewedPostsLinks'

export default function createWatchedState(state) {
  return onChange(state, function (path) {
    if (path.startsWith('formState')) {
      renderForm(this)
    }

    if (path.startsWith('feedData')) {
      renderFeeds(this)
    }

    if (path.startsWith('postData')) {
      renderPosts(this)
    }

    if (path.startsWith('currentModalPostId')) {
      renderModal(this)
    }

    if (path.startsWith('viewedPostIds')) {
      renderViewedPostsLinks(this.viewedPostIds)
    }
  })
}
