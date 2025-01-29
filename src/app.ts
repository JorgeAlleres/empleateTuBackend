import express, {Response, Request} from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import authRouter from 'routes/auth.routes'
import userRouter from 'routes/user.routes'
import cors  from 'cors'

const app = express()

app.use(express.json())
app.use(helmet())
app.use(compression())
app.use(cookieParser())

//TODO limitar cors
//Cambiar la url cuando deploy

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

const limiter = rateLimit({
    max: 3,
    windowMs: 1000*15*60 //15 minutos
})
app.use(limiter)

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

app.get('/', (req:Request, res:Response)=>{
    res.send('Bienvenido al backend (api rest)')
})

export default app