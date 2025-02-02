import { Request, Response } from 'express'
import { getCities } from './cityController'
import { fetchCities } from '../services/cityService'
import { ApiError } from '../utils/apiError'

// mocks
jest.mock('../services/cityService')
const mockedFetchCities = fetchCities as jest.MockedFunction<typeof fetchCities>

// tests
describe('City Controller', () => {
  let req: Partial<Request>
  let res: Partial<Response>

  beforeEach(() => {
    // Reset mocks and create fresh request/response objects
    jest.clearAllMocks()
    req = { query: {} }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  it('should fetch cities by query', async () => {
    req.query = { query: 'New York' }

    // service response
    const mockData = [{ name: 'New York' }, { name: 'Los Angeles' }]
    mockedFetchCities.mockResolvedValue(mockData)

    await getCities(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(mockData)
  })

  it('should return 400 if query is missing', async () => {
    req.query = {}

    await getCities(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: 'City or coordinates required',
    })
  })

  it('should handle API errors', async () => {
    req.query = { query: 'New York' }

    // service error
    mockedFetchCities.mockRejectedValue(new ApiError(500, 'API Error'))

    await getCities(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'API Error' })
  })

  it('should handle unexpected errors', async () => {
    req.query = { query: 'New York' }

    // service error
    mockedFetchCities.mockRejectedValue(new Error('Unexpected Error'))

    await getCities(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'An unexpected error occurred',
    })
  })
})
