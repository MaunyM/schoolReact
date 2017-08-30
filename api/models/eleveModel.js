import mongoose from 'mongoose';

const endPoint = 'eleves';

const ElevesSchema = {
    name: String,
    master: [String]
};

const Model = mongoose.model(endPoint, ElevesSchema);
Model.endpoint = endPoint;
export {Model};