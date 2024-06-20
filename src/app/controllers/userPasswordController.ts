import { Request, Response } from 'express';
import { userRepository } from '../repositories/UserRepository';
import { BadRequestError } from '../helpers/api-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const JWT_SECRET = process.env.JWT_SECRET ?? 'some super secret...';

export class userPasswordController {
    async forgotPassword(req: Request, res: Response) {
        const { email } = req.body;

        const user = await userRepository.findOneBy({ email });

        if (!user) {
            throw new BadRequestError('Usuário não registrado');
        }

        const secret = JWT_SECRET + user.password;
        const payload = { email: user.email, id: user.id };
        const token = jwt.sign(payload, secret, { expiresIn: '15m' });
        const link = `http://localhost:3333/reset-password/${user.id}/${token}`; 

        const transporter = nodemailer.createTransport({
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

    async resetPassword(req: Request, res: Response) {
        const { id, token } = req.params;
        const { password, password2 } = req.body;

        if (password !== password2) {
            throw new BadRequestError('As senhas não coincidem');
        }

        const userId = Number(id);

        if (isNaN(userId)) {
            throw new BadRequestError('ID inválido');
        }

        const user = await userRepository.findOneBy({ id: userId });

        if (!user) {
            throw new BadRequestError('ID inválido');
        }

        const secret = JWT_SECRET + user.password;
        try {
            jwt.verify(token, secret);

            const hashPassword = await bcrypt.hash(password, 10);
            user.password = hashPassword;

            await userRepository.save(user);

            return res.status(200).json({ message: 'Senha redefinida com sucesso' });
        } catch (error) {
            return res.status(400).json({ message: 'Token inválido ou expirado' });
        }
    }
}