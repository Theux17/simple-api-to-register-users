import { Request, Response, NextFunction } from 'express'
import User from '../models/User'

async function user(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const email : string = req.body.email

    const foundUser = await User.findOne({ email })
    if (foundUser) return res.status(400).json({
        error: "Email already registered"
    })

    const user = await User.findById(id)
    if (user && !user || user == null) return res.status(404).json({
        error: "User does not exist."
    })
        
    next()
}

export default { user }