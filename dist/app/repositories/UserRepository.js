"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const User_1 = __importDefault(require("../entities/User"));
const data_source_1 = require("../../database/data-source");
exports.userRepository = data_source_1.AppDataSource.getRepository(User_1.default);
const getUsers = () => {
    return exports.userRepository.find();
};
exports.default = { getUsers };
