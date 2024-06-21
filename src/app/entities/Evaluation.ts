import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()//tipar q nem os oto
  id: number;

  @Column()
  PsychName: string;

  @Column()
  UserName: string;

  @Column()
  rating: number; 

  @Column()
  review: string;

  @Column()
  createdAt: Date;
}

/*import { Router } from 'express';
import { EvaluationController } from './evaluation.controller';

const router = Router();
const evaluationController = new EvaluationController();

router.post('/evaluations', evaluationController.createEvaluation);
router.get('/evaluations', evaluationController.getEvaluations);
router.get('/evaluations/:id', evaluationController.getEvaluationById);
router.put('/evaluations/:id', evaluationController.updateEvaluation);
router.delete('/evaluations/:id', evaluationController.deleteEvaluation);

export default router;*/


/*import { Router } from 'express';
import evaluationRoute from './evaluation.route';

const router = Router();

router.use('/evaluations', evaluationRoute);

export default router;*/