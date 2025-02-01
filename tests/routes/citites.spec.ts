import request from 'supertest'
import { server } from '../../src/server'
import axios from 'axios'

const mockCities = [
  {
    id: 1,
    wikiDataId: 'Q84',
    type: 'city',
    city: 'London',
    name: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    region: 'England',
    regionCode: 'ENG',
    regionWdId: 'Q1860',
    latitude: 51.5074,
    longitude: -0.1278,
    population: 8982000,
  },
  {
    id: 2,
    wikiDataId: 'Q60',
    type: 'city',
    city: 'New York',
    name: 'New York',
    country: 'United States',
    countryCode: 'US',
    region: 'New York',
    regionCode: 'NY',
    regionWdId: 'Q1384',
    latitude: 40.7128,
    longitude: -74.006,
    population: 8419600,
  },
]

// Mock axios for testing
jest.mock('axios')

describe('GET /api/cities', () => {
  it('should return a list of cities when a valid query is provided', async () => {
    // Mock the response from axios to match the expected structure
    ;(axios.get as jest.Mock).mockResolvedValueOnce({
      data: { data: mockCities },
    })

    const response = await request(server).get('/api/cities?query=London')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockCities)
  })

  it('should return 400 if no query is provided', async () => {
    const response = await request(server).get('/api/cities')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('City or coordinates required')
  })

  it('should return 500 if the API key is missing', async () => {
    delete process.env.RAPID_API_KEY

    const response = await request(server).get('/api/cities?query=London')

    expect(response.status).toBe(500)
    expect(response.body.message).toBe('API key is missing')
  })

  it('should return 500 if an unexpected error occurs', async () => {
    process.env.RAPID_API_KEY = 'mock-api-key'

    // Simulate a non-Axios error
    ;(axios.get as jest.Mock).mockRejectedValueOnce(
      new Error('Unexpected error'),
    )

    const response = await request(server).get('/api/cities?query=London')

    expect(response.status).toBe(500)
    expect(response.body.message).toBe('An unexpected error occurred')
  })

  it('should handle API errors gracefully', async () => {
    process.env.RAPID_API_KEY = 'mock-api-key'

    // Simulate an AxiosError
    const mockError = new Error('API request failed') as Error
    ;(axios.get as jest.Mock).mockRejectedValueOnce(mockError)

    const response = await request(server).get('/api/cities?query=London')

    expect(response.status).toBe(500)
    expect(response.body.message).toBe('An unexpected error occurred')
  })
})
