import {bind, forbidden} from './controller';

const bindEleve = (resource) => {
    const parentBind = bind(resource);
    parentBind.get_all = (req, res) => {
        if (!req.user)  return forbidden(res);
        resource.find({userId : req.user._id}, (err, resource) => {
            if (err) res.send(err);
            res.json(resource);
        });
    };

    return parentBind;
};


export {bindEleve};