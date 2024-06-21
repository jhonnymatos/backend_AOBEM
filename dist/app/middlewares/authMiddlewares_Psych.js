"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const api_errors_1 = require("../helpers/api-errors");
const PsychRepository_1 = require("../repositories/PsychRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = async (req, res, next) => {
    var _a;
    const { authorization } = req.headers;
    if (!authorization) {
        throw new api_errors_1.UnauthorizedError('Nao Autorizado');
    }
    const token = authorization.split(' ')[1];
    const { id } = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '');
    const psych = await PsychRepository_1.psychRepository.findOneBy({ id });
    if (!psych) {
        throw new api_errors_1.BadRequestError('Nao autorizado');
    }
    const { password: _, ...loggedPsych } = psych;
    req.psych = loggedPsych;
    next();
};
exports.authMiddleware = authMiddleware;
