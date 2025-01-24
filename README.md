# Weather API Integration

This project is a Node.js server that integrates with external APIs to fetch weather data and provide city search suggestions. It acts as a proxy to communicate with weather and city search services, offering users the ability to retrieve weather information based on city names, search terms, or coordinates.

## Features

- **Weather Data Fetching**: Fetch weather data for a specific city or geographic coordinates.
- **City Autocomplete**: Suggests city names as users type in the search field.
- **Multiple API Endpoints**:
  - `GET /weather?city={cityName}`: Fetch weather data for a specific city name.
  - `GET /cities?query={searchTerm}`: Return a list of city suggestions based on a search term.
  - `GET /weather?lat={latitude}&lon={longitude}`: Fetch weather data for a specific latitude/longitude (optional).
- **Error Handling**: Handles API errors, timeouts


## Setup

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/) installed on your machine. You will also need to obtain an API key for the weather service you choose to integrate with (e.g., [OpenWeatherMap](https://openweathermap.org/)).

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/massucatto/weather-app-server.git
   cd weather-app-server
   ```

2. Install the dependencies:
    ```bash
    npm install
    ```
3. Set up your environment variables. Create a .env file in the root of the project and add your API keys:
    ```bash
    OPEN_WEATHER_API_KEY=your_openweather_api_key
    RAPID_API_KEY=your_rapid_api_key
    ```
4. Start the server:
    ```bash
    npm run dev
    ```

### API Endpoints
1. Fetches the weather data for the specified city.
    ```bash
        GET http://localhost:3000/api/weather?city=London
    ```

2. Returns a list of city suggestions based on the search term.
    ```bash
        GET http://localhost:3000/api/cities?query=Lon
    ```

### Testing

1. You can run the tests using Jest:
    ```bash
    npm run test
    ```

## Built with
![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-007ACC?logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=fff&style=flat)



### Useful links
- https://openweathermap.org/current
- https://openweathermap.org/api/geocoding-api
- https://rapidapi.com/wirefreethought/api/geodb-cities/playground/5978313be4b06b85e4b0da1e