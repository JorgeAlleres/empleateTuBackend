import { Response, Request, NextFunction } from 'express'
import jwt from "jsonwebtoken"

//TODO Quita el any
export const isAdmin = (req: Request, res: Response, next: NextFunction): any => {
    const token = req.cookies.token
    try {
        const { role } = jwt.decode(token) as jwt.JwtPayload
        if (role != 'admin') throw new Error('Access denied')
        next()
    } catch(error) {
        res.status(403).json({error:'Access denied'})
    }
}