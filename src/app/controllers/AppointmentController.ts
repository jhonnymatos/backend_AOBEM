import { Request, Response } from 'express';
import { userRepository } from '../repositories/UserRepository';
import { psychRepository } from '../repositories/PsychRepository';
import { appointmentRepository } from '../repositories/AppointmentRepository';


export class AppointmentController {
  async create(req: Request, res: Response) {
    const { userId, psychId, name, email, phone, reason } = req.body;

    try {
      const user = await userRepository.findOneBy({ id: Number(userId) });
      const psych = await psychRepository.findOneBy({ id: Number(psychId) });

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      if (!psych) {
        return res.status(404).json({ message: 'Psicólogo não encontrado' });
      }

      const newAppointmentRequest = appointmentRepository.create({
        name, email, phone, reason, user, psych
      });
      await appointmentRepository.save(newAppointmentRequest);

      return res.status(201).json(newAppointmentRequest);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async listByPsych(req: Request, res: Response) {
    const { psychId } = req.params;

    try {
      const appointmentRequests = await appointmentRepository.find({
        where: { psych: { id: Number(psychId) }, approved: false },
        relations: ['user']
      });

      return res.json(appointmentRequests);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async approve(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const appointmentRequest = await appointmentRepository.findOneBy({ id: Number(id) });

      if (!appointmentRequest) {
        return res.status(404).json({ message: 'Pedido de consulta não encontrado' });
      }

      appointmentRequest.approved = true;
      await appointmentRepository.save(appointmentRequest);

      return res.status(200).json(appointmentRequest);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async reject(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const appointmentRequest = await appointmentRepository.findOneBy({ id: Number(id) });

      if (!appointmentRequest) {
        return res.status(404).json({ message: 'Pedido de consulta não encontrado' });
      }

      await appointmentRepository.remove(appointmentRequest);

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}
