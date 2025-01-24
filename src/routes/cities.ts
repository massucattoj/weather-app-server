import express, { Request, Response } from 'express'
import axios from 'axios'

const router = express.Router()

const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities'
const API_TIMEOUT = 5000
const RESULT_LIMIT = 10

router.get('/cities', async (req: Request, res: Response) => {
  try {
    const { query } = req.query

    if (!process.env.RAPID_API_KEY) {
      res.status(500).json({ message: 'API key is missing' })
      return
    }

    if (!query) {
      res.status(400).json({ message: 'City or coordinates required' })
      return
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

    const cities = response.data.data

    res.status(200).json(cities)
  } catch (error: unknown) {
    res.status(500).json({
      message: 'An unexpected error occurred',
    })
  }
})

export default router
