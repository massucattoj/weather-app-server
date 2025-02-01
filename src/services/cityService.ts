import axios from 'axios'

const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities'
const API_TIMEOUT = 5000
const RESULT_LIMIT = 10

export const fetchCities = async (query: string) => {
  if (!process.env.RAPID_API_KEY) {
    throw new Error('API key is missing')
  }

  const response = await axios.get(GEO_API_URL, {
    params: {
      namePrefix: query,
      limit: RESULT_LIMIT,
    },
    timeout: API_TIMEOUT,
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
    },
  })

  return response.data.data
}
