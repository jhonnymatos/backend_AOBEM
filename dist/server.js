"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./database/data-source");
const error_1 = require("./app/middlewares/error");
const routes_1 = __importDefault(require("./app/routes/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(error_1.errorMiddleware);
data_source_1.AppDataSource.initialize().then(async () => {
    console.log('Database OK');
    app.listen(3333, () => {
        console.log('Server started on port 3333');
    });
});
