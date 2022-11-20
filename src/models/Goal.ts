import mongoose from 'mongoose'
import { IUser } from "./User"


interface IGoal {
  user: IUser
  text: string
}

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
  }
)

const Goal = mongoose.model<IGoal>('Goal', goalSchema)
export default Goal
