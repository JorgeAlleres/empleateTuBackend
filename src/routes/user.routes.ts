import { Router } from "express";
import {UserController} from '../controllers/user.controller'
import { isAuthenticate } from "../middlewares/auth.middleware";
import { isAdmin } from "@/middlewares/user.middleware";

const router = Router()

router.get('/', isAdmin, isAuthenticate, UserController.usersList)
router.get('/profile', isAuthenticate, UserController.profile)

//CREA EL ENDPOINT QUE LISTE TODOS LOS USUARIOS DE LA WEB
//A ESTE ENDPOINT SOLO PUEDE ACCEDER EL USUARIO ROLE = ADMIN
// CREA RUTAS, SERVICIOS, CONTROLLERS Y MIDDLEWARE

export default router