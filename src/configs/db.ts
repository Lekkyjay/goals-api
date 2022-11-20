import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.ATLAS_URL as string)
    console.log(colors.cyan.underline(`MongoDB connected to host: ${conn.connection.host}`))
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default connectDB