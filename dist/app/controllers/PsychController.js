"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PsychController = void 0;
const PsychRepository_1 = require("../repositories/PsychRepository");
const api_errors_1 = require("../helpers/api-errors");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class PsychController {
    async create(req, res) {
        const { name, email, password, phone, crp, estado } = req.body;
        console.log(name, email, password, phone, crp, estado);
        const psychExists = await PsychRepository_1.psychRepository.findOneBy({ email });
        if (psychExists) {
            throw new api_errors_1.BadRequestError('E-mail já existe');
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const newPsych = PsychRepository_1.psychRepository.create({
            name,
            email,
            password: hashPassword,
            phone,
            crp,
            estado
        });
        await PsychRepository_1.psychRepository.save(newPsych);
        const { password: _, ...psych } = newPsych;
        return res.status(201).json(psych);
    }
    async login(req, res) {
        var _a;
        const { email, password } = req.body;
        const psych = await PsychRepository_1.psychRepository.findOneBy({ email });
        if (!psych) {
            throw new api_errors_1.BadRequestError('E-mail ou senha inválidos');
        }
        const verifyPass = await bcrypt_1.default.compare(password, psych.password);
        if (!verifyPass) {
            throw new api_errors_1.BadRequestError('E-mail ou senha inválidos');
        }
        const token = jsonwebtoken_1.default.sign({ id: psych.id }, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '', {
            expiresIn: '8h',
        });
        const { password: _, ...psychLogin } = psych;
        return res.json({
            psych: psychLogin,
            token: token,
        });
    }
    async getProfile(req, res) {
        return res.json(req.psych);
    }
}
exports.PsychController = PsychController;
