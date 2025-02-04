import { prisma } from "../database/database";
import { HttpException } from "../exceptions/httpException";
import { Offer } from "prisma/prisma-client";


export class OfferService {
    static async getAll() {
        const findOffers = await prisma.offer.findMany()
        return findOffers
    }
    static async create(offer: Offer) {
        const findOffer = await prisma.offer.findFirst({ where: { title: offer.title } })
        if (findOffer) throw new HttpException(409, `Offer ${offer.title} already exists`)
        return await prisma.offer.create({ data: { ...offer } })
    }
    static async delete(idOffer: number) {
        const offerDeleted = await prisma.offer.delete({ where: { id: idOffer } })
        if (!offerDeleted) throw new HttpException(409, `OfferID ${idOffer} doesnt exists`)
        return offerDeleted
    }
    static async update(idOffer: number, offer: Offer) {
        const offerUpdate = await prisma.offer.update({
            where: { id: idOffer },
            data: { ...offer }
        })
        if (!offerUpdate) throw new HttpException(409, `OfferID ${idOffer} doesnt exists`)
        return offerUpdate
    }
    static async rate(idUser: number,idOffer:number, value: number) {
        const findOffer = await prisma.offer.findUnique({ where: {id:idOffer}})
        if (!findOffer) throw new HttpException(404, 'Offer not exists')

            //TODO poner en un middleware de validacion
        if (value < 0 || value > 5) throw new HttpException(400, 'Rate value most be 0-5')
        prisma.rate.upsert({
            where: {
                idUser_idOffer: {
                    idUser, idOffer
                }
            },
            update: {
                value
            },
            create: {
                idUser, idOffer, value
            }
        })
    }

    static async getRate(idOffer: number) {
        // SELECT avg(value) as mediaClasificacion, count(value) as totalRates
        // FROM rate
        // where idOffer=id
        const ratingStats = await prisma.rate.aggregate({
            where:{idOffer},
            _avg: {value:true},
            _count: {value:true}
        })

        return {
            totalRatings: ratingStats._count.value,
            averageRatings: ratingStats._avg.value?.toFixed(2)
        }
    }

    static async getMyRate(idOffer: number, idUser: number) {
        const findOffer = await prisma.offer.findUnique({ where: {id:idOffer}})
        if (!findOffer) throw new HttpException(404, 'Offer not exists')

        return await prisma.rate.findUnique({
            where:{
                idUser_idOffer:{
                    idUser,
                    idOffer
                }
            },
            select: {value:true}
        })
    }
}