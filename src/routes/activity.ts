import express from 'express'
import { getActivitySuggestion } from '../controllers/activitySuggestion'

const router = express.Router()

/**
 * @swagger
 * /activity:
 *   post:
 *     summary: Get activity suggestion based on a message
 *     description: Fetch an activity suggestion based on the user's input message.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: The user's input message for activity suggestion.
 *     responses:
 *       200:
 *         description: Activity suggestion retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activity:
 *                   type: string
 *                   description: The suggested activity based on the message.
 *       400:
 *         description: Bad request (missing or invalid message)
 *       500:
 *         description: Internal server error
 */
router.post('/activity', getActivitySuggestion)

export default router
