import axios from 'axios'
import { ApiError } from '../utils/apiError'

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const TIMEOUT = 5000

const fetchWeather = async (params: Record<string, string>) => {
  if (!process.env.OPEN_WEATHER_API_KEY) {
    throw new ApiError(500, 'API key is missing')
  }

  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        ...params,
        units: 'metric',
        appid: process.env.OPEN_WEATHER_API_KEY,
      },
      timeout: TIMEOUT,
    })
    return response.data
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new ApiError(
        error.response?.status || 500,
        error.response?.data?.message || 'Failed to fetch weather data',
      )
    }
    throw new ApiError(500, 'An unexpected error occurred')
  }
}

export const fetchWeatherByCity = async (city: string) => {
  return fetchWeather({ q: city })
}

export const fetchWeatherByCoordinates = async (lat: string, lon: string) => {
  return fetchWeather({ lat, lon })
}
