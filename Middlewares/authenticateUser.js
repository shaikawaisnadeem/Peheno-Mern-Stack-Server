import jwt from 'jsonwebtoken';

const authenticateUser = (req,res,next)=>{
    const token = req.cookies.token;
    if (!token){
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    try {
        const decoded = jwt.verify(token, 'yourSecretKey');
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}
export default authenticateUser;