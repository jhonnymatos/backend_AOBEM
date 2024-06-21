import { Router } from 'express';
import { UserController } from '../controllers/UserController'
import { PsychController } from '../controllers/PsychController';
import { userPasswordController } from '../controllers/userPasswordController';
import { psychPasswordController } from '../controllers/psychPasswordController';
import { authMiddleware } from '../middlewares/authMiddlewares_User';
import { FormsController } from '../controllers/FormsController';
import { EvaluationController } from '../controllers/EvaluationController';

const routes = Router();

routes.post('/user', new UserController().create)
routes.post('/userlogin', new UserController().login)

routes.post('/psych', new PsychController().create)
routes.post('/psychlogin', new PsychController().login)

routes.use(authMiddleware)
routes.get('/userprofile', new UserController().getProfile)
routes.get('/psychprofile', new PsychController().getProfile)

const formsController = new FormsController();
routes.post('/forms', formsController.createForm);
routes.get('/forms', formsController.getForms);
routes.get('/forms/:id', formsController.getFormById);
routes.get('/forms/filter/:filter/:value', formsController.getFormsByFilter);

const evaluationController = new EvaluationController();
routes.post('/evaluations', evaluationController.createEvaluation);
routes.get('/evaluations', evaluationController.getEvaluations);
routes.get('/evaluations/:id', evaluationController.getEvaluationById);
routes.put('/evaluations/:id', evaluationController.updateEvaluation);
routes.delete('/evaluations/:id', evaluationController.deleteEvaluation);



export default routes;