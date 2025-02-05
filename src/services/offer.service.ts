import { prisma } from "../database/database";
import { HttpException } from "../exceptions/httpException";
import { Offer } from "prisma/prisma-client";


export class OfferService {
    static async getById(id: number) {
        const findOffer = await prisma.offer.findUnique({ where: { id } })
        if (!findOffer) throw new HttpException(404, 'Offer not found')
        return findOffer
    }
    static async getAll(title: string = '') {

        return await prisma.offer.findMany({
            where: {
                ...(title && {
                    title: {
                        contains: title,
                        //mode: "insensitive" // Búsqueda sin distinción entre mayúsculas y minúsculas
                    }
                })
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 100,
            include: {
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });
    }
    static async create(offer: Offer, idUser: number) {
        return await prisma.offer.create({
            data: {
                ...offer,
                idUserCreator: idUser
            } 
        })
    }
    static async delete(id: number) {
        try {
            return await prisma.offer.delete({ where: { id } });
        } catch (error) {
            throw new HttpException(404, "Offer not found");
        }
    }
    static async update(id: number, offer: Offer) {
        const findOffer = await prisma.offer.findUnique({where:{id}})
        if(!findOffer) throw new HttpException(404, 'Offer doesnt exists')
        return await prisma.offer.update({
            where: {id},
            data: {
                ...offer,
            } 
        })
    }
    static async rate(idUser: number, idOffer: number, value: number) {
        const findOffer = await prisma.offer.findUnique({ where: { id: idOffer } })
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
            where: { idOffer },
            _avg: { value: true },
            _count: { value: true }
        })

        return {
            totalRatings: ratingStats._count.value,
            averageRatings: ratingStats._avg.value?.toFixed(2)
        }
    }

    static async getMyRate(idOffer: number, idUser: number) {
        const findOffer = await prisma.offer.findUnique({ where: { id: idOffer } })
        if (!findOffer) throw new HttpException(404, 'Offer not exists')

        return await prisma.rate.findUnique({
            where: {
                idUser_idOffer: {
                    idUser,
                    idOffer
                }
            },
            select: { value: true }
        })
    }
}