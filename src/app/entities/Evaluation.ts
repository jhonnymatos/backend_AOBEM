import { Entity, Column, PrimaryGeneratedColumn, ManyToOne  } from 'typeorm';
import User from './User';
import Psych from './Psych';

@Entity()
   class Evaluation {
  @PrimaryGeneratedColumn()//tipar q nem os oto
  id: number;

  @Column()
  rating: number; 

  @Column({ type: 'text', nullable: true })
  review: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, user => user.evaluations)
  user: User;

  @ManyToOne(() => Psych, psych => psych.evaluations)
  psych: Psych;
}

export default Evaluation;

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