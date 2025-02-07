import { HttpException } from "../exceptions/httpException"
import { OfferService } from "../services/offer.service"
import { NextFunction, Request, Response } from "express"

export class OfferController {
    static async getById(req:Request, res:Response, next:NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid offer ID");

            // pasar a entero
            const offer = await OfferService.getById(id)
            res.status(200).json(offer)
        }catch(error){
            next(error)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { title } = req.query;
            const offers = await OfferService.getAll(title as string)
            res.status(200).json(offers)
        } catch (error) {
            next(error)
        }
    }
    static async create(req: Request, res: Response, next:NextFunction) {
        try {
            const offersData = req.body
            const userId = req.user?.id
            if (!userId) throw new HttpException(400, "User creator ID is required");
            const newOffer = await OfferService.create(offersData, userId)
            res.status(201).json({ message: 'Offer register successfully', newOffer })
        } catch (error) {
            next(error)
        }
    }
    static async delete(idOffer:number, req:Request, res:Response, next:NextFunction) {
        try {
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid offer ID");

            const offerDeleted = await OfferService.delete(id)
            res.status(201).json({ message: 'Offer deleted successfully', offerDeleted })
        } catch (error) {
            next(error)
        }
    }
    static async update(id:number, req: Request, res: Response, next:NextFunction) {
        try {
            const offerData = req.body
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid offer ID");

            const updatedOffer = await OfferService.update(id, offerData)
            res.status(201).json({ message: 'Offer updated successfully', updatedOffer })
        } catch (error) {
            next(error)
        }
    }
    static async rate(req:Request, res:Response, next: NextFunction){
        try{
            const offerId = Number.parseInt(req.params.id)
            if (isNaN(offerId)) throw new HttpException(400, "Invalid offer ID");

            const {value} = req.body
            const userId = req.user.id

            await OfferService.rate(userId, offerId, value)
            res.status(200).json({message: 'Offer rate successfully'})
        }catch(error){
            next(error)
        }
    }

    static async getRate(req:Request, res:Response, next: NextFunction){
        try{
            const offerId = Number.parseInt(req.params.id)
            if (isNaN(offerId)) throw new HttpException(400, "Invalid offer ID");

            await OfferService.getRate(offerId)
            res.status(200).json({message: 'Offer rate successfully'})
        }catch(error){
            next(error)
        }
    }

    static async getMyRate(req:Request, res:Response, next: NextFunction){
        //TODO    
    }
}
