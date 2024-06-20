const jwt = require('jsonwebtoken');
const authenticateMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ msg: 'Usuário não encontrado' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Token inválido' });
  }
};

module.exports = authenticateMiddleware;
