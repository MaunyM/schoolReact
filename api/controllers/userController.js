import {bind} from './controller';
import bcrypt from 'bcrypt';
import {generateToken} from '../../jwt';

const forbidden = (res) => {
    return res.status(403).json({
        error: true,
        message: 'Wrong Username or Password'
    });
};

const bindUser = (resource) => {
    const parentBind = bind(resource);
    parentBind.create = () => {
    };

    parentBind.signup = (req, res) => {
        bcrypt.hash(req.body.password.trim(), 10, (err, hash) => {
            const new_resource = new resource(
                {
                    name: req.body.name,
                    password: hash
                });
            new_resource.save((err, user) => {
                if (err)
                    res.send(err);
                const token = generateToken(user);
                res.json({user, token});
            });
        });

    };

    parentBind.signin = (req, res) => {
        resource.findOne({name: req.body.name}).exec((err, user) => {
            if (err) throw err;
            if (!user) return forbidden(res);
            bcrypt.compare(req.body.password, user.password,
                (err, valid) => {
                    if (err) throw err;
                    if (!valid) return forbidden(res);
                    const token = generateToken(user);
                    res.json({user, token});
                }
            )
            ;
        });
    };
    parentBind.me = (req, res) => {
        if (!req.user) return forbidden(res);
        res.json(req.user);
    };
    return parentBind;
};


export {bindUser};