require('dotenv').config()
import express from 'express'
import path from 'path'
import { errorHandler} from './middlewares/errorHandler'
import connectDB from './configs/db'
import goalRoutes from './routes/goals'
import userRoutes from './routes/user'
import authRoutes from './routes/auth'
import mongoose from 'mongoose'

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//testing errorHandler
app.use('/testing', (req, res) => {
  res.status(400)
  throw new Error('Error testing. Status 400')
})

app.use('/api/goals', goalRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

// serve client
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', '../', 'client', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => res.send('Please set NODE_ENV to production'))
}

app.use(errorHandler)

const PORT = process.env.PORT || 5000

mongoose.connection.once('open', () => {
  app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))
})
