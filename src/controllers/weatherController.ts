import { Request, Response } from 'express'
import {
  fetchWeatherByCity,
  fetchWeatherByCoordinates,
} from '../services/weatherService'
import { ApiError } from '../utils/apiError'

export const getWeather = async (req: Request, res: Response) => {
  try {
    const { city, lat, lon } = req.query

    if (!city && !(lat && lon)) {
      throw new ApiError(400, 'City or coordinates are required')
    }

    let weather
    if (city) {
      weather = await fetchWeatherByCity(city as string)
    } else if (lat && lon) {
      weather = await fetchWeatherByCoordinates(lat as string, lon as string)
    }

    res.status(200).json(weather)
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' })
    }
  }
}
