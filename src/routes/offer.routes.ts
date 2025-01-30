import { Router } from "express";
//import {OfferController} from '../controllers/offer.controller'

const router = Router()

//Listar todas las ofertas localhost:3000/api/offerts/?title=react&category=DAM
//router.get('/', OfferController.getAll)
//Añadir una oferta nueva POST localhost:3000/api/offerts/{body}
//router.post('/', OfferController.save)
// DELETE Borrar una oferta localhost:3000/api/offerts/XXXX
//router.delete('/:id', OfferController.delete)
// MODIFICAR Actualizar una oferta localhost:3000/api/offerts/XXXX  {body}
//router.put('/id', OfferController.update)

//Calificamos una oferta    {body}
//router.post('/:id/rate', OfferController.rate)
// Vemos que calificaion total se le ha dado a una oferta
//router.get('/:id/rate/', OfferController.getRate)

export default router