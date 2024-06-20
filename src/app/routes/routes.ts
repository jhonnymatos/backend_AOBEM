import { Router } from 'express';
import { UserController } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/authMiddlewares';


const routes = Router();

routes.post('/user', new UserController().create)
routes.post('/login', new UserController().login)
routes.get('/profile', authMiddleware, new UserController().getProfile)

// routes.post('/psych', new PsychController().create)
// routes.post('/login', new PsychController().login)
// routes.get('/profile', new PsychController().getProfile)

export default routes;