import mongoose from 'mongoose'

export interface IUser {
  _id?: string
  name: string
  email: string
  password: string
}


const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Please add a name'] },
    email: { type: String, required: [true, 'Please add an email'], unique: true },
    password: { type: String, required: [true, 'Please add a password'] },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model<IUser>('User', userSchema)
export default User
