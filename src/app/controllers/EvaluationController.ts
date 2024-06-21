import { Request, Response } from 'express';
import { AppDataSource } from '../../database/data-source';
import { Evaluation } from '../entities/Evaluation';

const evaluationRepository = AppDataSource.getRepository(Evaluation);

export class EvaluationController {
  async createEvaluation(req: Request, res: Response) {
    const { rating, review } = req.body;
    const evaluation = new Evaluation();
    evaluation.rating = rating;
    evaluation.review = review;
    try {
      await evaluationRepository.save(evaluation);
      res.status(201).json({ message: 'Avaliação criada com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar avaliação' });
    }
  }

  async getEvaluations(req: Request, res: Response) {
    try {
      const evaluations = await evaluationRepository.find();
      res.json(evaluations);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar avaliações' });
    }
  }

  async getEvaluationById(req: Request, res: Response) {
    const id = +req.params.id;
    if (!id || id <= 0) {
      res.status(400).json({ message: 'ID inválido' });
      return;
    }
    try {
      const evaluation = await evaluationRepository.findOneBy({ id });
      if (!evaluation) {
        res.status(404).json({ message: 'Avaliação não encontrada' });
      } else {
        res.json(evaluation);
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar avaliação' });
    }
  }

  async updateEvaluation(req: Request, res: Response) {
    const id = +req.params.id;
    if (!id || id <= 0) {
      res.status(400).json({ message: 'ID inválido' });
      return;
    }
    const { rating, review } = req.body;
    try {
      const evaluation = await evaluationRepository.findOneBy({ id });
      if (!evaluation) {
        res.status(404).json({ message: 'Avaliação não encontrada' });
      } else {
        evaluation.rating = rating;
        evaluation.review = review;
        await evaluationRepository.save(evaluation);
        res.json({ message: 'Avaliação atualizada com sucesso' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar avaliação' });
    }
  }

  async deleteEvaluation(req: Request, res: Response) {
    const id = +req.params.id;
    if (!id || id <= 0) {
      res.status(400).json({ message: 'ID inválido' });
      return;
    }
    try {
      await evaluationRepository.delete(id);
      res.json({ message: 'Avaliação deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar avaliação' });
    }
  }
}