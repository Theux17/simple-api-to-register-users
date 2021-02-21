import { Request, Response, NextFunction } from 'express'
import User from '../models/User'

interface UserInterface {
    id: string
    name: string
    email: string
    occupation: string
    goals: Array<object>
}

async function user(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const email: string = req.body.email

    const user = await User.findById(id)
    if (user && user == null) return res.status(404).json({
        error: "User does not exist."
    })

    const foundUser = await User.findOne({ email }) as UserInterface
    if (foundUser && foundUser.id != id && foundUser.email == email) return res.status(400).json({
        error: "Email already registered"
    })

    next()
}

export default { user }