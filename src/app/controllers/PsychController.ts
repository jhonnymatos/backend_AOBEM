import { Request, Response } from 'express';
import { psychRepository } from '../repositories/PsychRepository';
import { BadRequestError } from '../helpers/api-errors';
import bcrypt from 'bcrypt'

export class PsychController {
	async create(req: Request, res: Response) {
		const { name, email, password, phone, crp, estado } = req.body

        const psychExists = await psychRepository.findOneBy({ email })

        if (psychExists) {
			throw new BadRequestError('E-mail já existe')
		}

        const hashPassword = await bcrypt.hash(password, 10)

        const newPsych = psychRepository.create({
			name,
			email,
			password: hashPassword,
            phone,
            crp,
            estado
		})

        await psychRepository.save(newPsych)

        const { password: _, ...psych } = newPsych

        return res.status(201).json(psych)
    }
}