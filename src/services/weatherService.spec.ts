import { fetchWeatherByCity, fetchWeatherByCoordinates } from './weatherService'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Weather Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch weather by city', async () => {
    const mockData = { name: 'London', main: { temp: 15 } }
    mockedAxios.get.mockResolvedValue({ data: mockData })

    const weather = await fetchWeatherByCity('London')

    expect(weather).toEqual(mockData)
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: 'London',
          units: 'metric',
          appid: process.env.OPEN_WEATHER_API_KEY, // Use environment variable
        },
        timeout: 5000,
      },
    )
  })

  it('should fetch weather by coordinates', async () => {
    const mockData = { name: 'London', main: { temp: 15 } }
    mockedAxios.get.mockResolvedValue({ data: mockData })

    const weather = await fetchWeatherByCoordinates('51.5074', '-0.1278')

    expect(weather).toEqual(mockData)
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          lat: '51.5074',
          lon: '-0.1278',
          units: 'metric',
          appid: process.env.OPEN_WEATHER_API_KEY, // Use environment variable
        },
        timeout: 5000,
      },
    )
  })
})
