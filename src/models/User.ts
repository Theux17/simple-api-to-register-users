import { Document } from 'mongoose'
import mongoose from '../database/index'

interface UserInterface extends Document {
    name: string
    email: string
    occupation: string
    goal: string
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
    goal: {
        type: String,
        required: true
    }
})

UserSchema.set('timestamps', true)

const User = mongoose.model<UserInterface>('User', UserSchema)

export default User 