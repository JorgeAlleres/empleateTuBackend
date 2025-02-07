import { Router } from "express";
import {OfferController} from '../controllers/offer.controller'
import { isAdmin } from "../middlewares/user.middleware";
import { isAuthenticate } from "../middlewares/auth.middleware";

const router = Router()

//Listar todas las ofertas localhost:3000/api/offers/?title=react&category=DAM
router.get('/', OfferController.getAll)
//Filtrado de las ofertas localhost:3000/api/offers/?title=react&category=DAM
router.get('/:id', OfferController.getById)
//Añadir una oferta nueva POST localhost:3000/api/offers/{body}
router.post('/', isAuthenticate, isAdmin, OfferController.create)
// DELETE Borrar una oferta localhost:3000/api/offers/XXXX
router.delete('/:id', isAuthenticate, isAdmin, OfferController.delete)
// MODIFICAR Actualizar una oferta localhost:3000/api/offers/XXXX  {body}
router.put('/:id', isAuthenticate, isAdmin, OfferController.update)

//Calificamos una oferta    {body}
router.post('/:id/rate', OfferController.rate)
// Vemos que calificaion total se le ha dado a una oferta
router.get('/:id/rate/', OfferController.getRate)

export default router