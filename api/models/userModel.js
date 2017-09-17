import mongoose from 'mongoose';

const endPoint = 'users';

const UsersSchema = {
    name: String,
    password: String

};

const Model = mongoose.model(endPoint, UsersSchema);
Model.endpoint = endPoint;
export {Model};