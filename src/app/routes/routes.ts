import { Router } from 'express';
import { UserController } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/authMiddlewares_User';
import { PsychController } from '../controllers/PsychController';

const routes = Router();

routes.use('/private', authenticateMiddleware, (req, res) => {6  res.json({ msg: 'Você está logado!' });7});

routes.post('/user', new UserController().create)
routes.post('/userlogin', new UserController().login)

routes.post('/psych', new PsychController().create)
routes.post('/psychlogin', new PsychController().login)

//rotas para atualização de perfil usuario

const authenticateMiddleware = require('../middlewares/migrate_autentification');

const User = require('../controllers/UserController');

routes.put('/profile', async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id);
 
   
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
 
    await user.save();

    res.json({ msg: 'Perfil atualizado com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});
//acaba aqui o codigo

routes.use(authMiddleware)
routes.get('/userprofile', new UserController().getProfile)
routes.get('/psychprofile', new PsychController().getProfile)


export default routes;