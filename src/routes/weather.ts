import 'dotenv/config'
import express, { Request, Response } from 'express'
import axios from 'axios'

const router = express.Router()

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const TIMEOUT = 5000

const fetchWeatherByCity = async (city: string) => {
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

const fetchWeatherByCoordinates = async (lat: string, lon: string) => {
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

router.get('/weather', async (req: Request, res: Response) => {
  try {
    const { city, lat, lon } = req.query

    if (!process.env.OPEN_WEATHER_API_KEY) {
      res.status(500).json({ message: 'API key is missing' })
      return
    }

    if (city) {
      const weather = await fetchWeatherByCity(city as string)
      res.json(weather)
      return
    }

    if (lat && lon) {
      const weather = await fetchWeatherByCoordinates(
        lat as string,
        lon as string,
      )
      res.json(weather)
      return
    }

    res.status(400).json({ message: 'City or coordinates are required' })
  } catch (error: unknown) {
    res.status(500).json({
      message: 'An unexpected error occurred',
    })
  }
})

export default router
