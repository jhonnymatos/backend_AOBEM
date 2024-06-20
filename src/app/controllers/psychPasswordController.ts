import { Request, Response } from 'express';
import { psychRepository } from '../repositories/PsychRepository';
import { BadRequestError } from '../helpers/api-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const JWT_SECRET = process.env.JWT_SECRET ?? 'some super secret...';

export class psychPasswordController {
    async forgotPassword(req: Request, res: Response) {
        const { email } = req.body;

        console.log('Request Body:', req.body);

        const psych = await psychRepository.findOneBy({ email });

        if (!psych) {
            throw new BadRequestError('Especialista não registrado');
        }

        const secret = JWT_SECRET + psych.password;
        const payload = { email: psych.email, id: psych.id };
        const token = jwt.sign(payload, secret, { expiresIn: '15m' });
        const link = `http://localhost:3333/reset-password/psych/${psych.id}/${token}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_PSYCHS,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_PSYCHS,
            to: psych.email,
            subject: 'Redefinição de senha',
            text: `Clique no link para redefinir sua senha: ${link}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erro ao enviar email:', error);
                return res.status(500).json({ message: 'Erro ao enviar email' });
            }
            return res.status(200).json({ message: 'Link de redefinição de senha enviado para o seu e-mail' });
        });
    }

    async resetPassword(req: Request, res: Response) {
        const { id, token } = req.params;
        const { password, password2 } = req.body;

        console.log('Request Params:', req.params);
        console.log('Request Body:', req.body);

        if (password !== password2) {
            throw new BadRequestError('As senhas não coincidem');
        }

        const psychId = Number(id);
        if (isNaN(psychId)) {
            throw new BadRequestError('ID inválido');
        }

        const psych = await psychRepository.findOneBy({ id: psychId });

        if (!psych) {
            throw new BadRequestError('ID inválido');
        }

        const secret = JWT_SECRET + psych.password;
        try {
            jwt.verify(token, secret);

            const hashPassword = await bcrypt.hash(password, 10);
            psych.password = hashPassword;

            await psychRepository.save(psych);

            return res.status(200).json({ message: 'Senha redefinida com sucesso' });
        } catch (error) {
            return res.status(400).json({ message: 'Token inválido ou expirado' });
        }
    }
}