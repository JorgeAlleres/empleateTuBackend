import { Router } from "express";
import {UserController} from '@/controllers/user.controller'
import { isAuthenticate } from "@/middlewares/auth.middleware";

const router = Router()

router.get('/profile', isAuthenticate, UserController.profile)

export default router