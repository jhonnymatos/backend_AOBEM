import "reflect-metadata"
import 'dotenv/config'
import { DataSource } from "typeorm"
import { CreateUsersTable1718857614267 } from "./migrations/1718857614267-CreateUsersTable";
import { CreatePsychsTable1718857656161 } from "./migrations/1718857656161-CreatePsychsTable";
import { CreateEvaluationTable1718928082688 } from "./migrations/1718928082688-CreateEvaluationTable";
import User from "../app/entities/User";
import Psych from "../app/entities/Psych";
import Evaluation  from "../app/entities/Evaluation";

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
    entities:  [User, Psych, Evaluation],
    migrations: [CreateUsersTable1718857614267, CreatePsychsTable1718857656161, CreateEvaluationTable1718928082688 ],
    subscribers: [],
})

//conectar com o bd: npm run dev:server

//rodar a migration: npm run typeorm -- -d ./src/database/data-source.ts migration:run