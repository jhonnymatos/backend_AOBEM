import { Request, Response } from 'express';
import { AppDataSource } from '../../database/data-source';
import { Forms } from '../entities/Forms';
/*import { Like } from 'typeorm';*/

export class FormsController {
  private formsRepository = AppDataSource.getRepository(Forms);

  async createForm(req: Request, res: Response) {
    try {
      const newForm = this.formsRepository.create(req.body);
      await this.formsRepository.save(newForm);
      res.status(201).json({ message: 'Formulário criado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar formulário' });
    }
  }

  async getForms(req: Request, res: Response) {
    try {
      const forms = await this.formsRepository.find();
      res.json(forms);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar formulários' });
    }
  }

  async getFormById(req: Request, res: Response) {
    const id = +req.params.id; // converte string para número
    try {
      const form = await this.formsRepository.findOneBy({ id });
      if (!form) {
        res.status(404).json({ message: 'Formulário não encontrado' });
      } else {
        res.json(form);
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar formulário' });
    }
  }

  async getFormsByFilter(req: Request, res: Response) {
    const filter = req.params.filter;
    const value = req.params.value;
    try {
      const forms = await this.formsRepository.findBy({ [filter]: value });
      res.json(forms);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar formulários' });
    }
  }
}
