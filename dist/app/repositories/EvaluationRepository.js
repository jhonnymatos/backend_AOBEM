"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluationRepository = void 0;
const data_source_1 = require("../../database/data-source");
const Evaluation_1 = __importDefault(require("../entities/Evaluation"));
exports.evaluationRepository = data_source_1.AppDataSource.getRepository(Evaluation_1.default);
