import { Router } from "express";
import {AuthController} from '../controllers/auth.controller'
import { registerValidation } from "@/middlewares/validators.middleware";
import { ValidationMiddleware } from "@/middlewares/validation.middleware";

const router = Router()

router.post('/login', AuthController.login)
//router.post('/login', AuthController.logout)
router.post('/register',registerValidation, ValidationMiddleware, AuthController.register)

export default router