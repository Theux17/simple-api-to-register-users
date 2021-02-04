import { Request, Response } from 'express'

import User from '../models/User'

interface UserInterface {
    name: String
    email: String
    occupation: String
    goal: String
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

            await User.findByIdAndRemove(id)

            return res.json({
                message: "User deleted successfully."
            })

        } catch (error) {
            return res.status(500).json({
                error: "Unexpected error while deleting the user."
            })
        }
    }
}