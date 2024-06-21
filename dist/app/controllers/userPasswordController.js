"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPasswordController = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const api_errors_1 = require("../helpers/api-errors");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const JWT_SECRET = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : 'some super secret...';
class userPasswordController {
    async forgotPassword(req, res) {
        const { email } = req.body;
        const user = await UserRepository_1.userRepository.findOneBy({ email });
        if (!user) {
            throw new api_errors_1.BadRequestError('Usuário não registrado');
        }
        const secret = JWT_SECRET + user.password;
        const payload = { email: user.email, id: user.id };
        const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '15m' });
        const link = `http://localhost:3333/reset-password/${user.id}/${token}`;
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERS,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USERS,
            to: user.email,
            subject: 'Redefinição de senha',
            text: `Clique no link para redefinir sua senha: ${link}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Erro ao enviar email' });
            }
            return res.status(200).json({ message: 'Link de redefinição de senha enviado para o seu e-mail' });
        });
    }
    async resetPassword(req, res) {
        const { id, token } = req.params;
        const { password, password2 } = req.body;
        if (password !== password2) {
            throw new api_errors_1.BadRequestError('As senhas não coincidem');
        }
        const userId = Number(id);
        if (isNaN(userId)) {
            throw new api_errors_1.BadRequestError('ID inválido');
        }
        const user = await UserRepository_1.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new api_errors_1.BadRequestError('ID inválido');
        }
        const secret = JWT_SECRET + user.password;
        try {
            jsonwebtoken_1.default.verify(token, secret);
            const hashPassword = await bcrypt_1.default.hash(password, 10);
            user.password = hashPassword;
            await UserRepository_1.userRepository.save(user);
            return res.status(200).json({ message: 'Senha redefinida com sucesso' });
        }
        catch (error) {
            return res.status(400).json({ message: 'Token inválido ou expirado' });
        }
    }
}
exports.userPasswordController = userPasswordController;
