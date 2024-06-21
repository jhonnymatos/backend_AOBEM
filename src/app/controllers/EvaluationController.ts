import { Request, Response } from 'express';
import { userRepository } from '../repositories/UserRepository';
import { psychRepository } from '../repositories/PsychRepository';
import { evaluationRepository } from '../repositories/EvaluationRepository';

export class EvaluationController {
  async create(req: Request, res: Response) {
    const { rating, review, psychId, userId } = req.body;

    try {
      const user = await userRepository.findOneBy({ id: Number(userId) });
      const psych = await psychRepository.findOneBy({ id: Number(psychId) });

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      if (!psych) {
        return res.status(404).json({ message: 'Psicólogo não encontrado' });
      }

      const newEvaluation = evaluationRepository.create({ rating, review, user, psych });
      await evaluationRepository.save(newEvaluation);

      return res.status(201).json(newEvaluation);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async list(req: Request, res: Response) {
    const { psychId } = req.params;

    try {
      const evaluations = await evaluationRepository.find({
        where: { psych: { id: Number(psychId) } },
        relations: ['user', 'psych'],
      });

      return res.json(evaluations);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}