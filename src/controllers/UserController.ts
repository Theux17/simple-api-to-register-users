import { Request, Response } from 'express'
import { Document } from 'mongoose'

import User from '../models/User'

interface UserInterface extends Document {
    name: string
    email: string
    occupation: string
    goal: string
}

export default {
    async create(req: Request, res: Response) {
        try {
            const {
                name,
                email,
                occupation,
                goal
            }: UserInterface = req.body

            const user = await User.create({
                name,
                email,
                occupation,
                goal
            })

            return res.status(201).json({ user })

        } catch (error) {
            return res.status(500).json({
                error: "Unexpected error when registering a new user."
            })
        }
    },

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params

            const user = await User.findById(id)

            return res.json({ user })

        } catch (error) {
            return res.status(500).json({
                error: "Unexpected error while showing user."
            })
        }
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params

            const {
                name,
                email,
                occupation,
                goal
            }: UserInterface = req.body

            const user = await User.findByIdAndUpdate(id, {
                name,
                email,
                occupation,
                goal
            }, { new: true })

            return res.json({ user })

        } catch (error) {
            return res.status(500).json({
                error: "Unexpected error while updating the user."
            })
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const user = await User.findById(id) as UserInterface

            await User.findByIdAndRemove(id)

            return res.json({
                message: `User ${user.name} deleted successfully.`
            })

        } catch (error) {
            return res.status(500).json({
                error: "Unexpected error while deleting the user."
            })
        }
    }
}