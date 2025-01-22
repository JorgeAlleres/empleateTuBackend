import { AuthService } from "../services/auth.services";
import {Response, Request} from "express";

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const userData = req.body
            const newUser = await AuthService.register(userData)
            res.status(201).json({ message: 'User register succesfully', newUser })
        } catch (error) {
            res.status(409).json({ message: 'User register failed' + error})
        }
    }
    static async login(req: Request, res: Response) {
        try {
            const userData = req.body
            //TODO validar el body (opcional)
            const token = await AuthService.login(userData.email, userData.password)
            //TODO Inyectar cookie al cliente
            res.status(201).json({ message: 'Login succesfully', token })
        } catch (error) {
            res.status(409).json({ message: 'Login failed' + error })
        }
    }
}

