import { Request, Response, NextFunction } from 'express'
import User from '../models/User'

interface GoalInterface {
    goal: string
    userId: string
}

interface UserInterface {
    name: string
    email: string
    occupation: string
    goals: Array<GoalInterface>
}

async function goal(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params
    const goalNotCreate = req.body.goal

    const user = await User.findById(userId) as UserInterface
    
    const foundGoal = user.goals.find(({ goal }: Pick<GoalInterface, "goal"> ) => goal == goalNotCreate )
    if(foundGoal) return res.status(400).json({
        error: "Goal already registered"
    })
    
    next()
}

export default { goal }