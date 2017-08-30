require("babel-register");
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const Domaine = require('./api/models/domaineModel');
const Competence = require('./api/models/competenceModel');
const Etape = require('./api/models/etapeModel');
const Eleve = require('./api/models/eleveModel');

const Controller = require('./api/controllers/controller');
const DomainesController = Controller.bind(Domaine.Model);
const CompetencesController = Controller.bind(Competence.Model);
const EtapesController = Controller.bind(Etape.Model);
const ElevesController = Controller.bind(Eleve.Model);

//MONGODB_URI in injected by Heroku
let mongooseUri = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://127.0.0.1/test";

const mongoose = require('mongoose');
mongoose.connect(mongooseUri);
mongoose.Promise = global.Promise;

const app = express();

app.set('port', (process.env.PORT || 3001));
app.use(bodyParser.json());

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

const adddRoute = (app, controller) => {
    app.route(`/api/${controller.resource.endpoint}`)
        .get(controller.get_all)
        .post(controller.create);

    app.route(`/api/${controller.resource.endpoint}/:id`)
        .get(controller.get)
        .put(controller.update)
        .delete(controller.delete);
};

adddRoute(app, DomainesController);
adddRoute(app, CompetencesController);
adddRoute(app, EtapesController);
adddRoute(app, ElevesController);

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});



