"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
require("dotenv/config");
const typeorm_1 = require("typeorm");
const _1718857614267_CreateUsersTable_1 = require("./migrations/1718857614267-CreateUsersTable");
const _1718857656161_CreatePsychsTable_1 = require("./migrations/1718857656161-CreatePsychsTable");
const _1718928082688_CreateEvaluationTable_1 = require("./migrations/1718928082688-CreateEvaluationTable");
const User_1 = __importDefault(require("../app/entities/User"));
const Psych_1 = __importDefault(require("../app/entities/Psych"));
const Evaluation_1 = __importDefault(require("../app/entities/Evaluation"));
const port = process.env.DB_PORT;
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User_1.default, Psych_1.default, Evaluation_1.default],
    migrations: [_1718857614267_CreateUsersTable_1.CreateUsersTable1718857614267, _1718857656161_CreatePsychsTable_1.CreatePsychsTable1718857656161, _1718928082688_CreateEvaluationTable_1.CreateEvaluationTable1718928082688],
    subscribers: [],
});
//conectar com o bd: npm run dev:server
//rodar a migration: npm run typeorm -- -d ./src/database/data-source.ts migration:run
