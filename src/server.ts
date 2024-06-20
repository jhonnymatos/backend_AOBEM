import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import { errorMiddleware } from './app/middlewares/error'
import routers from './app/routes/routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routers);

app.use(errorMiddleware)
AppDataSource.initialize().then(async () => {
    console.log('Database OK');
    app.listen(3333, () => {
        console.log('Server started on port 3333');
    })
})
