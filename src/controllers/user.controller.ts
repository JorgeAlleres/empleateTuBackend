import { UserService } from "../services/user.service";
import {Response, Request, NextFunction} from 'express'

export class UserController{
    static async profile(req:Request, res:Response, next:NextFunction) {
        try {
            const email = req.user.email
            const user =  await UserService.getByEmail(email)
            res.status(200).json(user)
        } catch(error) {
            next(error)
        }
    }
    static async usersList(req:Request, res:Response, next:NextFunction) {
        try {
            const users = await UserService.getAll()
            res.status(200).json(users)
        } catch(error) {
            next(error)
        }
    }
}
