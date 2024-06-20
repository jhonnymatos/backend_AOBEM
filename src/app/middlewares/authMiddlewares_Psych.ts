import { NextFunction, Request, Response  } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-errors";
import { psychRepository } from "../repositories/PsychRepository";
import jwt from 'jsonwebtoken'


type JwtPayload = {
	id: number
}

export const authMiddleware = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {

    const {authorization} = req.headers

		if(!authorization) {
			throw new UnauthorizedError('Nao Autorizado')
		}

		const token = authorization.split(' ')[1]

		const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload

		const psych = await psychRepository.findOneBy({ id })

        if (!psych) {
			throw new BadRequestError('Nao autorizado')
		}

		const { password: _,...loggedPsych } = psych

        req.psych = loggedPsych

        next()
    }