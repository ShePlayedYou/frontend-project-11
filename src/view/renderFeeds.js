import createFeedsCard from './createFeedsCard'

export default function renderFeeds(state) {
  const feeds = document.querySelector('.feeds')
  feeds.innerHTML = ''
  const feedsCard = createFeedsCard()
  feeds.append(feedsCard)
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
};
