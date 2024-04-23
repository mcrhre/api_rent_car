import jwt from 'jsonwebtoken';
import LogonRepository from '../repositories/LogonRepository.js';

class AuthenticateToken {
    
    static SECRET = 'b0rborem@';

    static async verify(req, res, next) {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).send('No token provided');
        
        const result = await LogonRepository.verifyToken(token);

        if (!result) return res.status(401).send('Token does not exist');
        
        jwt.verify(token, AuthenticateToken.SECRET, (err, decoded) => {
            if (err) return res.status(403).send('Failed to authenticate token');
            req.userId = decoded.id;
            next();
        });
    };
}

export default AuthenticateToken;
