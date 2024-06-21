import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { PsychController } from '../controllers/PsychController';
import { userPasswordController } from '../controllers/userPasswordController';
import { psychPasswordController } from '../controllers/psychPasswordController';
import { authMiddleware } from '../middlewares/authMiddlewares_User';
import { EvaluationController } from '../controllers/EvaluationController';
import { FormsController } from '../controllers/FormsController';

const routes = Router()

routes.post('/user', new UserController().create)
routes.post('/userlogin', new UserController().login)

routes.post('/psych', new PsychController().create)
routes.post('/psychlogin', new PsychController().login)

routes.post('/forgotpassword', new userPasswordController().forgotPassword)
routes.put('/reset-password/user/:id/:token', new userPasswordController().resetPassword)

routes.post('/forgotpassword', new psychPasswordController().forgotPassword)
routes.put('/reset-password/psych/:id/:token', new psychPasswordController().resetPassword)

routes.post('/evaluations', new EvaluationController().create)
routes.get('/psychologists/:psychologistId/evaluations', new EvaluationController().list)

routes.post('/forms', new FormsController().createForm)
routes.get('/forms', new FormsController().getForms)
routes.get('/forms/:id', new FormsController().getFormById)
routes.get('/forms/filter/:filter/:value', new FormsController().getFormsByFilter)

routes.use(authMiddleware)
routes.get('/userprofile', new UserController().getProfile)
routes.get('/psychprofile', new PsychController().getProfile)

export default routes;