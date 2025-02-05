import { Request, Response } from 'express'
import { getWeather } from './weatherController'
import {
  fetchWeatherByCity,
  fetchWeatherByCoordinates,
} from '../services/weatherService'
import { ApiError } from '../utils/apiError'

// mocks
jest.mock('../services/weatherService')
const mockedFetchWeatherByCity = fetchWeatherByCity as jest.MockedFunction<
  typeof fetchWeatherByCity
>
const mockedFetchWeatherByCoordinates =
  fetchWeatherByCoordinates as jest.MockedFunction<
    typeof fetchWeatherByCoordinates
  >

describe('Weather Controller - getWeather', () => {
  let req: Partial<Request>
  let res: Partial<Response>

  beforeEach(() => {
    jest.clearAllMocks()
    req = { query: {} }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  it('should fetch weather by city', async () => {
    // Mock request query
    req.query = { city: 'London' }

    // Mock service response
    const mockData = { name: 'London', main: { temp: 15 } }
    mockedFetchWeatherByCity.mockResolvedValue(mockData)

    await getWeather(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(mockData)
    expect(mockedFetchWeatherByCity).toHaveBeenCalledWith('London')
  })

  it('should fetch weather by coordinates', async () => {
    req.query = { lat: '51.5074', lon: '-0.1278' }

    const mockData = { name: 'London', main: { temp: 15 } }
    mockedFetchWeatherByCoordinates.mockResolvedValue(mockData)

    await getWeather(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(mockData)
    expect(mockedFetchWeatherByCoordinates).toHaveBeenCalledWith(
      '51.5074',
      '-0.1278',
    )
  })

  it('should return 400 if city or coordinates are missing', async () => {
    req.query = {} // no city or coordinates

    await getWeather(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: 'City or coordinates are required',
    })
  })

  it('should handle API errors', async () => {
    req.query = { city: 'London' }

    const apiError = new ApiError(500, 'API Error')
    mockedFetchWeatherByCity.mockRejectedValue(apiError)

    await getWeather(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'API Error' })
  })

  it('should handle unexpected errors', async () => {
    req.query = { city: 'London' }

    const unexpectedError = new Error('Unexpected Error')
    mockedFetchWeatherByCity.mockRejectedValue(unexpectedError)

    await getWeather(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'An unexpected error occurred',
    })
  })

  it('should handle missing API key error', async () => {
    req.query = { city: 'London' }

    const apiError = new ApiError(500, 'API key is missing')
    mockedFetchWeatherByCity.mockRejectedValue(apiError)

    await getWeather(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'API key is missing',
    })
  })

  it('should handle timeout errors', async () => {
    req.query = { city: 'London' }

    const timeoutError = new ApiError(504, 'Request timed out')
    mockedFetchWeatherByCity.mockRejectedValue(timeoutError)

    await getWeather(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(504)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Request timed out',
    })
  })
})
