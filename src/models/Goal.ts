import { Document } from 'mongoose'
import mongoose from '../database/index'

interface Goal extends Document {
    goal: string
    userId: string
}

const GoalSchema = new mongoose.Schema({
    goal: {
        type: String,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

GoalSchema.set('timestamps', true)

const Goal = mongoose.model<Goal>('Goal', GoalSchema)

export default Goal