import { Router } from 'express';
import { UserController } from '../controllers/UserController'
import { PsychController } from '../controllers/PsychController';
import { userPasswordController } from '../controllers/userPasswordController';
import { psychPasswordController } from '../controllers/psychPasswordController';
import { authMiddleware } from '../middlewares/authMiddlewares_User';

const routes = Router();

routes.post('/user', new UserController().create)
routes.post('/userlogin', new UserController().login)

routes.post('/psych', new PsychController().create)
routes.post('/psychlogin', new PsychController().login)

routes.post('/forgot-password/user', new userPasswordController().forgotPassword);
routes.put('/reset-password/user/:id/:token', new userPasswordController().resetPassword);

routes.post('/forgot-password/psych', new psychPasswordController().forgotPassword);
routes.put('/reset-password/psych/:id/:token', new psychPasswordController().resetPassword);

routes.use(authMiddleware)
routes.get('/userprofile', new UserController().getProfile)
routes.get('/psychprofile', new PsychController().getProfile)


export default routes;