import createFeedsCard from './createFeedsCard'
import createPostsCard from './createPostsCard'

export default function renderFeeds(state) {
  const posts = document.querySelector('.posts')
  const feeds = document.querySelector('.feeds')

  posts.innerHTML = ''
  feeds.innerHTML = ''

  const feedsCard = createFeedsCard()
  const postsCard = createPostsCard()

  feeds.append(feedsCard)
  posts.append(postsCard)

  // all li

  state.feedData.forEach((el) => {
    const liFeed = document.createElement('li')
    liFeed.classList.add('list-group-item', 'border-0', 'border-end-0')

    const h3Feed = document.createElement('h3')
    h3Feed.classList.add('h6', 'm-0')
    h3Feed.textContent = el.feedTitle

    const pFeed = document.createElement('p')
    pFeed.classList.add('m-0', 'small', 'text-black-50')
    pFeed.textContent = el.feedDescription

    liFeed.appendChild(h3Feed)
    liFeed.appendChild(pFeed)
    const ulFeeds = feedsCard.querySelector('ul')
    ulFeeds.prepend(liFeed)
  })

  state.postData.forEach((post) => {
    const li = document.createElement('li')
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0')

    const a = document.createElement('a')
    a.href = post.link
    a.textContent = post.title
    if (state.viewedPostIds.has(post.id)) {
      a.classList.add('fw-normal', 'link-secondary')
    } else {
      a.classList.add('fw-bold')
    }
    a.setAttribute('data-id', post.id)
    a.setAttribute('target', '_blank')
    a.setAttribute('rel', 'noopener noreferrer')

    const button = document.createElement('button')
    button.type = 'button'
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm')
    button.textContent = 'Просмотр'
    button.setAttribute('data-id', post.id)
    button.setAttribute('data-bs-toggle', 'modal')
    button.setAttribute('data-bs-target', '#modal')

    li.appendChild(a)
    li.appendChild(button)
    const ulPosts = postsCard.querySelector('ul')
    ulPosts.prepend(li)
  })
};
