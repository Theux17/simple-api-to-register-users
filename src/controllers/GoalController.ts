import { Request, Response } from 'express'
import { Document } from 'mongoose'

import User from '../models/User'
import Goal from '../models/Goal'

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
    async index(req: Request, res: Response) {
        try {
            const { userId } = req.params
            
            const user = await User.findById(userId) as UserInterface

            return res.json({ goals: user.goals })
        } catch (error) {
            return res.status(500).json({
                error: "Unexpected error while list the goals."
            })
        }
    },

    async create(req: Request, res: Response) {
        try {
            const { userId } = req.params
            
            const goal = await Goal.create({
                goal: req.body.goal,
                userId
            })

            const user = await User.findById(userId) as UserInterface

            user.goals.push(goal)

            await user.save()

            return res.status(201).json({ goal })
        } catch (error) {
            return res.status(500).json({
                error: "Unexpected error while creating the goal."
            })
        }
    }
}