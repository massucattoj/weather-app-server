import express from 'express'
import weatherRoutes from './routes/weather'
import citiesRoutes from './routes/cities'
import cors from 'cors'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api', weatherRoutes)
app.use('/api', citiesRoutes)

// Start
app.get('/', (req, res) => {
  res.send('Welcome to the Weather App - Your daily info about weather :)')
})

export default app
