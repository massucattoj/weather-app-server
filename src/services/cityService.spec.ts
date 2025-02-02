import { fetchCities } from './cityService'
import axios from 'axios'

// mocks
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

// tests
describe('City Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch cities by query', async () => {
    const mockData = [{ name: 'London' }, { name: 'Los Angeles' }]
    mockedAxios.get.mockResolvedValue({ data: { data: mockData } })

    const cities = await fetchCities('New York')

    expect(cities).toEqual(mockData)
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
      {
        params: {
          namePrefix: 'New York',
          limit: 10,
        },
        timeout: 5000,
        headers: {
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        },
      },
    )
  })

  it('should throw an error if the API key is missing', async () => {
    // Save the original value
    const originalApiKey = process.env.RAPID_API_KEY

    // Override process.env.RAPID_API_KEY with undefined
    Object.defineProperty(process.env, 'RAPID_API_KEY', {
      value: undefined,
      writable: true,
    })

    await expect(fetchCities('New York')).rejects.toThrow('API key is missing')

    // Restore the original value
    Object.defineProperty(process.env, 'RAPID_API_KEY', {
      value: originalApiKey,
      writable: true,
    })
  })
})
