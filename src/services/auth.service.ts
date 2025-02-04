import { HttpException } from "../exceptions/httpException"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { PrismaClient, User } from "prisma/prisma-client"

const prisma = new PrismaClient()
const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass'
export class AuthService {
    static async register(user: User) {
        // ver si el usuario no existe
        // SELECT id,nombre FROM user WHERE email=user.email
        const findUser = await prisma.user.findUnique({where: {email: user.email}})
        if (findUser) throw new HttpException(409,`User ${user.email} already exists`)

        // encriptar el password
        const passwordEncrypted = await bcrypt.hash(user.password, 10)
        user.password=''
        // guardar el usuario en la bd
        // INSERT INTO user (name, password, email) VALUES (?,?,?)
        return await prisma.user.create({
            data:{
                ...user,
                password: passwordEncrypted,
                role: null
            },
            omit:{
                password:true
            }
        })
    }

    static async login(email:string, password:string){

        //Consulta sin usar prisma, lo hacemos para poder probar ataques al servidor 
        /*const query = `SELECT id, email, password, role FROM user WHERE email='${email}' AND password='${password}'`
        const findUsers = await prisma.$queryRawUnsafe(query) as User[]
        const findUser = findUsers[0]
        if(!findUser) throw new Error('Invalid user or password')
        */

        // ver si el usuario existe
         const findUser = await prisma.user.findUnique({where:{email}})
         if(!findUser) throw new HttpException(409, 'Invalid user or password')
 
         // ver si el password coincide
        const isPasswordCorrect = await bcrypt.compare(password, findUser.password)
        if(!isPasswordCorrect) throw new HttpException(409, 'Invalid user or password')
        

        // generar el token de autenticación
        const token = jwt.sign(
            {id:findUser.id, email:findUser.email, role:findUser.role}, 
            TOKEN_PASSWORD, 
            {expiresIn:"1h"}
        )
        // devolver el token
        return token
    }
}