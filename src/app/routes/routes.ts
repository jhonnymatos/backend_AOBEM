import { Router } from 'express';
import { UserController } from '../controllers/UserController'
//import psychRouter from '../controllers/PsychController';

const routes = Router();

routes.post('/user', new UserController().create)
routes.post('/login', new UserController().login)
//routers.use('/psych', psychRouter);

export default routes;