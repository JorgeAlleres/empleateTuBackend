import { Router } from "express";
import {CategoryController} from '../controllers/category.controller'
import { isAdmin } from "../middlewares/user.middleware";
import { isAuthenticate } from "../middlewares/auth.middleware";
import { categoryValidation } from "../middlewares/validators.middleware";
import { ValidationMiddleware } from "../middlewares/validation.middleware";

const router = Router()

router.get('/',isAuthenticate, CategoryController.getAll)
router.get('/:id',isAuthenticate, CategoryController.getById)
router.post('/', isAuthenticate,isAdmin, categoryValidation, ValidationMiddleware, CategoryController.create)
router.delete('/:id', isAuthenticate,isAdmin, CategoryController.delete)
router.put('/:id', isAuthenticate,isAdmin, categoryValidation, ValidationMiddleware, CategoryController.update)

export default router