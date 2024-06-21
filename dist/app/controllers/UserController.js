"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const api_errors_1 = require("../helpers/api-errors");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    async create(req, res) {
        const { name, email, password } = req.body;
        const userExists = await UserRepository_1.userRepository.findOneBy({ email });
        if (userExists) {
            throw new api_errors_1.BadRequestError('E-mail já existe');
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = UserRepository_1.userRepository.create({
            name,
            email,
            password: hashPassword,
        });
        await UserRepository_1.userRepository.save(newUser);
        const { password: _, ...user } = newUser;
        return res.status(201).json(user);
    }
    async login(req, res) {
        var _a;
        const { email, password } = req.body;
        const user = await UserRepository_1.userRepository.findOneBy({ email });
        if (!user) {
            throw new api_errors_1.BadRequestError('E-mail ou senha inválidos');
        }
        const verifyPass = await bcrypt_1.default.compare(password, user.password);
        if (!verifyPass) {
            throw new api_errors_1.BadRequestError('E-mail ou senha inválidos');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '', {
            expiresIn: '8h',
        });
        const { password: _, ...userLogin } = user;
        return res.json({
            user: userLogin,
            token: token,
        });
    }
    async getProfile(req, res) {
        return res.json(req.user);
    }
}
exports.UserController = UserController;
