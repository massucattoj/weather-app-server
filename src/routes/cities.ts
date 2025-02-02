import express from 'express'
import { getCities } from '../controllers/cityController'

const router = express.Router()

/**
 * @swagger
 * /cities:
 *   get:
 *     summary: Get cities by query
 *     description: Fetch a list of cities matching the query.
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: The city name prefix (e.g., "New York")
 *     responses:
 *       200:
 *         description: List of cities retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *       400:
 *         description: Bad request (missing query)
 *       500:
 *         description: Internal server error
 */
router.get('/cities', getCities)

export default router
