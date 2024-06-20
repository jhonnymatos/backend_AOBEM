import { Router } from 'express';
import { UserController } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/authMiddlewares_User';
import { PsychController } from '../controllers/PsychController';

const routes = Router();

routes.post('/user', new UserController().create)
routes.post('/userlogin', new UserController().login)

routes.post('/psych', new PsychController().create)
routes.post('/psychlogin', new PsychController().login)

routes.use(authMiddleware)
routes.get('/userprofile', new UserController().getProfile)
routes.get('/psychprofile', new PsychController().getProfile)


export default routes;