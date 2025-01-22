import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass'

export class AuthService {
    static async register(user: User) {
        //Ver si el usuario no existe
        //select * from user where email=user.email
        const findUser = await prisma.user.findUnique({ where: { email: user.email } })
        if (findUser) throw new Error(`User ${user.email} already exists`)

        //Encriptar el password
        const passwordEncripted = await bcrypt.hash(user.password, 10)
        user.password = ''
        //Guardar el usuario en la BBDD
        return await prisma.user.create({
            data: {
                ...user,
                password: passwordEncripted,
                role: null
            },
            omit: {
                password: true
            }
        })
    }
    static async login(email: string, password: string) {
        //Ver si el usuario existe
        const findUser = await prisma.user.findUnique({ where: { email } })
        if (!findUser) throw new Error('Invalid User or Password')
        //Comprobar el password encriptandolo
        const isPasswordCorrect = await bcrypt.compare(password, findUser.password)
        if (!isPasswordCorrect) throw new Error('Invalid User or Password')
        //Generar token de autenticacion
        const token = jwt.sign(
            {id:findUser.id, email:findUser.email, role:findUser.role},
            TOKEN_PASSWORD,
            { expiresIn: "1h"}
        )
        return token
    }
}