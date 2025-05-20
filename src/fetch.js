import axios from 'axios'

const parseUrl = (value) => {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(value)}`
  return axios.get(proxyUrl)
}

export default parseUrl
