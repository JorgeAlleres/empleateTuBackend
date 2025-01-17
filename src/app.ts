import express, {Response, Request} from 'express';

const app = express();

app.get('/', (req:Request,res:Response) => {
    res.send('Bienvenido al backend')
})

export default app