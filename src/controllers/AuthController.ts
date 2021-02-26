import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { Document } from 'mongoose'


import User from '../models/User'

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

export default {
    async create(req: Request, res: Response) {
        try {
            const { email } = req.body

            const user = await User.findOne({ email }) as UserInterface

            const token = sign({ id: user._id }, process.env.SECRET as string, {
                expiresIn: '1d'
            })

            return res.json({
                token,
                user
            })
            
        } catch (error) {
            return res.status(500).json({
                error: "Unexpected error while creating the goal."
            })
        }
    }
}