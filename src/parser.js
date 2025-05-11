/* global console, DOMParser */

import axios from "axios";

let postCounter = 0;
const generatePostId = () => `post_${postCounter += 1}`;

const parseUrl = (value) => {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(value)}`;

  return axios.get(proxyUrl)
  .then((response) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(response.data.contents, 'application/xml');
    
    const parseError = xml.querySelector('parsererror');
      if (parseError) {
        throw new Error('parseError');
      }

    const mainTitleFromRSS = xml.querySelector('channel > title');
    const mainDescriptionFromRSS = xml.querySelector('channel > description');
    const allItemsFromRSS = xml.querySelectorAll('item');

    const posts = Array.from(allItemsFromRSS).map((item) => ({
      title: item.querySelector('title')?.textContent,
      description: item.querySelector('description')?.textContent,
      link: item.querySelector('link')?.textContent,
    }));

    return {
      id: generatePostId(),
      feedTitle: mainTitleFromRSS.textContent,
      feedDescription: mainDescriptionFromRSS.textContent,
      feedItems: posts
    }
  })
  .catch((error) => {
    console.error('Ошибка запроса:', error);
  });    
}

export default parseUrl;