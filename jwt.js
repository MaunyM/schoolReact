import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || "FAKE";


const generateToken = (user) => {
    const payload = {
        name: user.name,
        _id: user._id.toString(),
    };
    return jwt.sign(payload, SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
};

const verify = (req, res, next) => {
    console.log('verify start');
    let token = req.headers.authorization;
    if (!token) return next();
    console.log('verify token : ', token);
    token = token.replace('Bearer ', '');
    jwt.verify(token, SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(401).json({
                success: false,
                message: 'Please register Log in'
            });
        } else {
            console.log('Verify User ok : ', JSON.stringify(user));
            req.user = user;
            next();
        }
    });
};

export {generateToken, verify};