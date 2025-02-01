import axios from 'axios'

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const TIMEOUT = 5000

export const fetchWeatherByCity = async (city: string) => {
  if (!process.env.OPEN_WEATHER_API_KEY) {
    throw new Error('API key is missing')
  }

  const response = await axios.get(WEATHER_API_URL, {
    params: {
      q: city,
      units: 'metric',
      appid: process.env.OPEN_WEATHER_API_KEY,
    },
    timeout: TIMEOUT,
  })

  return response.data
}

export const fetchWeatherByCoordinates = async (lat: string, lon: string) => {
  if (!process.env.OPEN_WEATHER_API_KEY) {
    throw new Error('API key is missing')
  }

  const response = await axios.get(WEATHER_API_URL, {
    params: {
      lat,
      lon,
      units: 'metric',
      appid: process.env.OPEN_WEATHER_API_KEY,
    },
    timeout: TIMEOUT,
  })

  return response.data
}
