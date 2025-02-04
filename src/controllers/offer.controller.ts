import { HttpException } from "../exceptions/httpException"
import { OfferService } from "../services/offer.service"
import { NextFunction, Request, Response } from "express"

export class OfferController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const offers = await OfferService.getAll()
            res.status(200).json(offers)
        } catch (error) {
            next(error)
        }
    }
    static async create(req: Request, res: Response, next:NextFunction) {
        try {
            const offersData = req.body
            const newOffer = await OfferService.create(offersData)
            res.status(201).json({ message: 'Offer register successfully', newOffer })
        } catch (error) {
            next(error)
        }
    }
    static async delete(idOffer:number, req:Request, res:Response, next:NextFunction) {
        try {
            const offerDeleted = await OfferService.delete(idOffer)
            res.status(201).json({ message: 'Offer deleted successfully', offerDeleted })
        } catch (error) {
            next(error)
        }
    }
    static async update(id:number, req: Request, res: Response, next:NextFunction) {
        try {
            const offersData = req.body
            const updatedOffer = await OfferService.update(id, offersData)
            res.status(201).json({ message: 'Offer updated successfully', updatedOffer })
        } catch (error) {
            next(error)
        }
    }
    static async rate(req:Request, res:Response, next: NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid offer ID");

            const {value} = req.body
            const userId = req.body.user.id

            await OfferService.rate(userId, id, value)
            res.status(200).json({message: 'Offer rate successfully'})
        }catch(error){
            next(error)
        }
    }

    static async getRate(req:Request, res:Response, next: NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid offer ID");

            await OfferService.getRate(id)
            res.status(200).json({message: 'Offer rate successfully'})
        }catch(error){
            next(error)
        }
    }
}
