import express, {Response, Request} from "express";
import authRouter from './routes/auth.routes'

const app = express()
app.use(express.json())
app.use('/api/auth', authRouter)

app.get('/', (rec:Request, res: Response) => {
    res.send('Bienvendio al backend (api rest)')
})

export default app