const dataParser = (response) => {
  const parser = new DOMParser()
  const xml = parser.parseFromString(response.data.contents, 'application/xml')

  const parseError = xml.querySelector('parsererror')
  if (parseError) {
    throw new Error('form.parseError')
  }

  const mainTitleFromRSS = xml.querySelector('channel > title')
  const mainDescriptionFromRSS = xml.querySelector('channel > description')
  const allItemsFromRSS = xml.querySelectorAll('item')

  const feed = {
    title: mainTitleFromRSS?.textContent ?? '',
    description: mainDescriptionFromRSS?.textContent ?? '',
  }

  const posts = Array.from(allItemsFromRSS).reverse().map(item => ({
    title: item.querySelector('title')?.textContent ?? '',
    description: item.querySelector('description')?.textContent ?? '',
    link: item.querySelector('link')?.textContent ?? '',
  }))

  return { feed, posts }
}

export default dataParser
