import { prisma } from "../database/database";
import { HttpException } from "../exceptions/httpException";
import { Offer} from "prisma/prisma-client";


export class OfferService {
    static async getAll() {
        const findOffers = await prisma.offer.findMany()
        return findOffers
    }
    static async create(offer: Offer) {
        const findOffer = await prisma.offer.findFirst({ where: { title: offer.title } })
        if (findOffer) throw new HttpException(409, `Offer ${offer.title} already exists`)
        return await prisma.offer.create({data: {...offer}})
    }
    static async delete(idOffer: number) {
        const offerDeleted = await prisma.offer.delete({ where: { id: idOffer } })
        if (!offerDeleted) throw new HttpException(409, `OfferID ${idOffer} doesnt exists`)
        return offerDeleted
    }
    static async update(idOffer: number, offer: Offer) {
        const offerUpdate = await prisma.offer.update({ 
            where: { id: idOffer },
            data: {...offer}
        })
        if (!offerUpdate) throw new HttpException(409, `OfferID ${idOffer} doesnt exists`)
        return offerUpdate
    }
    static async rate(idUser: number, id: number, value: number){
        //si existe lo actualizo
       // si no existe lo creo
    }

     static async getRate(id: number){
       
    }
}