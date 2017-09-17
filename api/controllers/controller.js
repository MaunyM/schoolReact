const forbidden = (res) => {
    return res.status(403).json({
        error: true,
        message: 'Forbidden'
    });
};

const bind = (resource) => ({
    resource,
    get_all: (req, res) => {
        if (!req.user)  return forbidden(res);
        resource.find({}, (err, resource) => {
            if (err) res.send(err);
            res.json(resource);
        });
    },

    create: (req, res) => {
        if (!req.user) return forbidden(res);
        const new_resource = new resource(req.body);
        new_resource.save((err, resource) => {
            if (err) res.send(err);
            res.json(resource);
        });
    },

    get: (req, res) => {
        if (!req.user) return forbidden(res);
        resource.findById(req.params.id, (err, resource) => {
            if (err) res.send(err);
            res.json(resource);
        });
    },

    update: (req, res) => {
        if (!req.user) return forbidden(res);
        resource.findOneAndUpdate({_id: req.params.id}, req.body, {}, (err, resource) => {
            if (err) res.send(err);
            res.json(resource);
        });
    },

    delete: (req, res) => {
        if (!req.user) return forbidden(res);
        resource.remove({
            _id: req.params.id
        }, (err, resource) => {
            if (err) res.send(err);
            res.json({message: ' Resource successfully deleted'});
        });
    }
});

export {bind, forbidden};