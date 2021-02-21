import { Document } from 'mongoose'
import mongoose from '../database/index'

interface GoalInterface {
    goal: string
    userId: string
}

interface UserInterface extends Document {
    name: string
    email: string
    occupation: string
    goals: Array<GoalInterface>
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    occupation: {
        type: String,
        required: true
    },
    goals: [{
        type: Object,
        ref: 'Goal'
    }]
})

UserSchema.set('timestamps', true)

const User = mongoose.model<UserInterface>('User', UserSchema)

export default User 