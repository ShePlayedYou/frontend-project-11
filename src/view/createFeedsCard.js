import i18next from 'i18next'

const createFeedsCard = () => {
  const cardFeeds = document.createElement('div')
  cardFeeds.classList.add('card', 'border-0')

  const cardBodyFeeds = document.createElement('div')
  cardBodyFeeds.classList.add('card-body')

  const cardTitleFeeds = document.createElement('h2')
  cardTitleFeeds.classList.add('card-title', 'h4')
  cardTitleFeeds.textContent = i18next.t('form.feeds')

  const cardUlFeeds = document.createElement('ul')
  cardUlFeeds.classList.add('list-group', 'border-0', 'rounded-0')

  cardBodyFeeds.appendChild(cardTitleFeeds)
  cardBodyFeeds.appendChild(cardUlFeeds)
  cardFeeds.appendChild(cardBodyFeeds)

  return cardFeeds
}

export default createFeedsCard
