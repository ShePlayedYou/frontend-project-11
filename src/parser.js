let postCounter = 0;
const generatePostId = () => `${postCounter += 1}`;

let feedCounter = 0;
const generateFeedId = () => `${feedCounter += 1}`;

const dataParser = (response, existingFeedId = null) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(response.data.contents, 'application/xml');
  
    const parseError = xml.querySelector('parsererror');
    if (parseError) {
      throw new Error('parseError');
    }
  
    const mainTitleFromRSS = xml.querySelector('channel > title');
    const mainDescriptionFromRSS = xml.querySelector('channel > description');
    const allItemsFromRSS = xml.querySelectorAll('item');
  
    const feedId = existingFeedId ?? generateFeedId();
  
    const posts = Array.from(allItemsFromRSS).reverse().map((item) => ({
      id: generatePostId(),
      feedId,
      title: item.querySelector('title')?.textContent ?? '',
      description: item.querySelector('description')?.textContent ?? '',
      link: item.querySelector('link')?.textContent ?? '',
    }));

  
    const feed = {
      id: feedId,
      feedTitle: mainTitleFromRSS?.textContent ?? '',
      feedDescription: mainDescriptionFromRSS?.textContent ?? '',
    };
  
    return { feed, posts };
  };
  

export default dataParser;