import request from 'supertest'
import app from '../../src/app'
import axios from 'axios'

const mockWeatherData = {
  coord: { lon: -0.1278, lat: 51.5074 },
  weather: [
    { id: 801, main: 'Clouds', description: 'Few clouds', icon: '02d' },
  ],
  base: 'stations',
  main: {
    temp: 15.5,
    feels_like: 14.2,
    temp_min: 14.0,
    temp_max: 17.0,
    pressure: 1012,
    humidity: 72,
    sea_level: 1012,
    grnd_level: 1010,
  },
  visibility: 10000,
  wind: { speed: 4.63, deg: 330 },
  clouds: { all: 20 },
  dt: 1618317047,
  sys: {
    type: 1,
    id: 1414,
    country: 'GB',
    sunrise: 1618294247,
    sunset: 1618342624,
  },
  timezone: 0,
  id: 2643743,
  name: 'London',
  cod: 200,
}

// Mock axios for testing
jest.mock('axios')

describe('GET /weather', () => {
  it('should return weather data when a valid city is provided', async () => {
    // Adjust the mock response to match the correct structure
    ;(axios.get as jest.Mock).mockResolvedValueOnce({
      data: mockWeatherData,
    })

    const response = await request(app).get('/api/weather?city=London')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockWeatherData)
  })

  it('should return weather data when valid coordinates are provided', async () => {
    // Mock axios to return mock weather data
    ;(axios.get as jest.Mock).mockResolvedValueOnce({
      data: mockWeatherData,
    })

    const response = await request(app).get(
      '/api/weather?lat=51.5074&lon=-0.1278',
    )

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockWeatherData)
  })
  it('should return 400 if both city and coordinates are missing', async () => {
    const response = await request(app).get('/api/weather')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('City or coordinates are required')
  })

  it('should return 500 if the API key is missing', async () => {
    delete process.env.OPEN_WEATHER_API_KEY

    const response = await request(app).get('/api/weather?city=London')

    expect(response.status).toBe(500)
    expect(response.body.message).toBe('API key is missing')
  })

  it('should return 500 if an unexpected error occurs', async () => {
    process.env.OPEN_WEATHER_API_KEY = 'mock-api-key'
    ;(axios.get as jest.Mock).mockRejectedValueOnce(
      new Error('Unexpected error'),
    )

    const response = await request(app).get('/api/weather?city=London')

    expect(response.status).toBe(500)
    expect(response.body.message).toBe('An unexpected error occurred')
  })

  it('should handle API errors gracefully', async () => {
    process.env.OPEN_WEATHER_API_KEY = 'mock-api-key'

    const mockError = new Error('API request failed') as Error

    // Mock axios to reject with this error
    ;(axios.get as jest.Mock).mockRejectedValueOnce(mockError)

    const response = await request(app).get('/api/weather?city=London')

    expect(response.status).toBe(500)
    expect(response.body.message).toBe('An unexpected error occurred')
  })
})
