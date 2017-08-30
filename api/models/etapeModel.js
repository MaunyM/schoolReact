import mongoose from 'mongoose';

const endPoint = 'etapes';

const EtapesSchema = {
    description: String,
    competenceId: String
};

const Model = mongoose.model(endPoint, EtapesSchema);
Model.endpoint = endPoint;
export {Model};