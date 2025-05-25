import axios from 'axios'

const parseUrl = (value) => {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(value)}`
  return axios.get(proxyUrl)
    .catch((error) => {
      if (error.code === 'ERR_NETWORK') {
        error.message = 'form.disconnected'
      }
      throw error
    })
}

export default parseUrl
