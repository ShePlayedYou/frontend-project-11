let postCounter = 0
const generatePostId = () => `${postCounter += 1}`

let feedCounter = 0
const generateFeedId = () => `${feedCounter += 1}`

const prepareParsedData = (parsedData, existingFeedId = null) => {
  const feedId = existingFeedId ?? generateFeedId()
  const feed = {
    id: feedId,
    feedTitle: parsedData.feed.title,
    feedDescription: parsedData.feed.description,
  }
  const posts = parsedData.posts.map(post => ({
    ...post,
    id: generatePostId(),
    feedId,
  }))
  return { feed, posts }
}

export default prepareParsedData
