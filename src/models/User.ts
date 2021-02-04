import mongoose from '../database/index'

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

const User = mongoose.model('User', UserSchema)

export default User 