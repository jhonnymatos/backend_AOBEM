import "reflect-metadata"
import 'dotenv/config'
import { DataSource } from "typeorm"

import User from "../app/entities/User";
import Psych from "../app/entities/Psych";
import 'dotenv/config'

const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
    type: 'postgres',
	host: process.env.DB_HOST,
	port: port,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Psych],
    migrations: [ ],
    subscribers: [],
})

//conectar com o bd: npm run dev:server

//rodar a migration: npm run typeorm -- -d ./src/database/data-source.ts migration:run