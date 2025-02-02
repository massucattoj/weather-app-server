import express from 'express'
import { getWeather } from '../controllers/weatherController'

const router = express.Router()

/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Get weather by city or coordinates
 *     description: Fetch weather data for a specific city or using latitude and longitude.
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: The city name (e.g., "London")
 *       - in: query
 *         name: lat
 *         schema:
 *           type: string
 *         description: The latitude (e.g., "51.5074")
 *       - in: query
 *         name: lon
 *         schema:
 *           type: string
 *         description: The longitude (e.g., "-0.1278")
 *     responses:
 *       200:
 *         description: Weather data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 main:
 *                   type: object
 *                   properties:
 *                     temp:
 *                       type: number
 *       400:
 *         description: Bad request (missing city or coordinates)
 *       500:
 *         description: Internal server error
 */
router.get('/weather', getWeather)

export default router
