import { Request, Response } from 'express'
import { fetchCities } from '../services/cityService'
import { ApiError } from '../utils/apiError'

export const getCities = async (req: Request, res: Response) => {
  try {
    const { query } = req.query

    if (!query) {
      throw new ApiError(400, 'City or coordinates required')
    }

    const cities = await fetchCities(query as string)
    res.status(200).json(cities)
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' })
    }
  }
}
