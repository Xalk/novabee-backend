import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, 'lucky666');

      req.userId = decoded._id;
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({
        message: 'Немає доступу',
      });
    }
  } else
    return res.status(403).json({
      message: 'Немає доступу',
    });
};
