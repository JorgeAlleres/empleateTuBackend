import { Router } from "express";
import {CategoryController} from '../controllers/category.controller'
import { isAdmin } from "../middlewares/user.middleware";
import { isAuthenticate } from "../middlewares/auth.middleware";

const router = Router()

//Listar todas las ofertas localhost:3000/api/offerts/?title=react&category=DAM
router.get('/', CategoryController.getAll)
//Añadir una oferta nueva POST localhost:3000/api/offerts/{body}
router.post('/', isAuthenticate,isAdmin, CategoryController.create)
// DELETE Borrar una oferta localhost:3000/api/offerts/XXXX
router.delete('/:id', isAuthenticate,isAdmin, CategoryController.delete)
// MODIFICAR Actualizar una oferta localhost:3000/api/offerts/XXXX  {body}
router.put('/:id', isAuthenticate,isAdmin, CategoryController.update)

export default router