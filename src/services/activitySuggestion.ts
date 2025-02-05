import axios from 'axios'
import { ApiError } from '../utils/apiError'

const OPENAPI_URL = 'https://api.openai.com/v1/chat/completions'

export const fetchActivitySuggestion = async (message: string) => {
  if (!process.env.OPENAPI_KEY) {
    throw new ApiError(500, 'API key is missing')
  }

  try {
    const openAiResponse = await axios.post(
      OPENAPI_URL,
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAPI_KEY}`,
        },
      },
    )

    return (
      openAiResponse.data.choices?.[0]?.message?.content?.trim() ||
      'No suggestion available'
    )
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
