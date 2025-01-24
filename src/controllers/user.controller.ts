import { UserService } from "../services/user.service";
import {Response, Request} from 'express'

export class UserController{
    static async profile(req:Request, res:Response) {
        const email = req.body.user.email
        const user =  await UserService.getByEmail(email)
        res.status(200).json(user)
    }
    static async usersList(req:Request, res:Response) {
        try {
            const users = await UserService.getAll()
            res.status(200).json(users)
        } catch(error) {
            res.status(409).json({message:'User list error: ' + error})
        }
    }
}
