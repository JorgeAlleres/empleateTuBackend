import express, {Response, Request} from "express";

const app = express()

app.get('/', (rec:Request, res: Response) => {
    res.send('Bienvendio al backend (api rest)')
})

export default app