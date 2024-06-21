"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.psychRepository = void 0;
const Psych_1 = __importDefault(require("../entities/Psych"));
const data_source_1 = require("../../database/data-source");
exports.psychRepository = data_source_1.AppDataSource.getRepository(Psych_1.default);
const getPsychs = () => {
    return exports.psychRepository.find();
};
exports.default = { getPsychs };
