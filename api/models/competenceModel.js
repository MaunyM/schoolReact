import mongoose from 'mongoose';

const endPoint = 'competences';

const CompetenceSchema = {
    description: String,
    domaineId: String
};

const Model = mongoose.model(endPoint, CompetenceSchema);
Model.endpoint = endPoint;
export {Model};