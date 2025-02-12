import { Router } from "express";
import {OfferController} from '../controllers/offer.controller'
import { isAdmin } from "../middlewares/user.middleware";
import { isAuthenticate } from "../middlewares/auth.middleware";
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import { offerValidation, rateValidation } from "../middlewares/validators.middleware";

const router = Router()

router.get('/',isAuthenticate, OfferController.getAll)
router.get('/:id',isAuthenticate, OfferController.getById)
router.post('/', isAuthenticate, isAdmin, offerValidation, ValidationMiddleware, OfferController.create)
router.delete('/:id', isAuthenticate, isAdmin, OfferController.delete)
router.put('/:id', isAuthenticate, isAdmin, offerValidation,  ValidationMiddleware, OfferController.update)

router.post('/:id/rate', isAuthenticate, rateValidation, ValidationMiddleware, OfferController.rate)
router.get('/:id/rate/', isAuthenticate, OfferController.getRate)

export default router