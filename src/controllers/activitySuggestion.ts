import { Request, Response } from 'express'
import { ApiError } from '../utils/apiError'
import { fetchActivitySuggestion } from '../services/activitySuggestion'

export const getActivitySuggestion = async (req: Request, res: Response) => {
  try {
    const { message } = req.body

    if (!message || typeof message !== 'string') {
      throw new ApiError(400, 'Message is required to get activity suggestions')
    }

    const activity = await fetchActivitySuggestion(message)
    res.status(200).json(activity)
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' })
    }
  }
}
