import 'dotenv/config'
import express from 'express'
import weatherRoutes from './routes/weather'
import swaggerUi from 'swagger-ui-express'
import citiesRoutes from './routes/cities'
import cors from 'cors'
import swaggerSpec from './swagger'

export const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api', weatherRoutes)
app.use('/api', citiesRoutes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Start
app.get('/', (req, res) => {
  res.send('Welcome to the Weather App - Your daily info about weather :)')
})
