import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken'

interface TokenPayload {
    id: string
    iat: number
    exp: number
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).json({
        error: "User not authorizated!"
    })

    const [, token] = authHeader.split(" ")
    
    try {
        const data = verify(token, process.env.SECRET as string)
        const { id } = data as TokenPayload

        const userNotAuthorizated = req.params.id && id !== req.params.id || req.params.userId && id !== req.params.userId

        if(userNotAuthorizated) return res.status(401).json({
            error: "User not authorizated!"
        })

        return next()
    } catch (error) {
        return res.status(401).json({
            error: "User not authorizated!"
        })
    }
}