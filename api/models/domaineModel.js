import mongoose from 'mongoose';

const endPoint = 'domaines';

const DomaineSchema = {
    name: String,
    code: String
};

const Model = mongoose.model(endPoint, DomaineSchema);
Model.endpoint = endPoint;
export {Model};