import { HttpException } from "../exceptions/httpException";
import { PrismaClient} from "prisma/prisma-client";

const prisma = new PrismaClient()
export class UserService {

    static async getById(id:number) {
        const findUser = await prisma.user.findUnique({where:{id}})
        if(!findUser) throw new HttpException(404, 'User not found')
        return findUser
    }

    static async getByEmail(email:string) {
        const findUser = await prisma.user.findUnique({where:{email}, omit:{password:true}})
        if(!findUser) throw new HttpException(404, 'User not found')
        return findUser
    }

    static async getAll() {
        const findUsers = await prisma.user.findMany({omit:{password:true}})
        return findUsers
    }
}