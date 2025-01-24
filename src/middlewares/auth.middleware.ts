import {Response, Request, NextFunction} from 'express'
import jwt from "jsonwebtoken"

const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass'

//TODO Quita el any
export const isAuthenticate = (req:Request, res:Response, next:NextFunction):any => {
    //const token = req.headers.authorization?.split(" ")[1]
    const token = req.cookies.token

    if(!token) return res.status(401).json({message: 'Access denied'})
    try {
        const tokenDecodificado = jwt.verify(token, TOKEN_PASSWORD)
        req.body.user = tokenDecodificado
        next()
    } catch(error) {
        res.status(401).json({error:'Invalid token'})
    }
}

export const checkEmail = ({email}: {email:string}) => {
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if(!regexEmail.test(email)) throw new Error('Email missmatch the restrictions')
}

export const checkPassword = ({password}: {password:string}) => {
    const regexPassword = /^.{4,}$/
    if(!regexPassword.test(password)) throw new Error('Password missmatch the restrictions')
}