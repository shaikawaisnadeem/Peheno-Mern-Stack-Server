import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {

  const authHeader = req.headers.authorization;
  console.log(req.headers)

  if (authHeader == undefined) {

    return res.status(401).json({ message: "Not Found" });
  }

  const token = authHeader.split(' ')[1].trim();
  try {
    const decoded = jwt.verify(token, 'test#123');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authenticateUser;
