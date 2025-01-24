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

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
