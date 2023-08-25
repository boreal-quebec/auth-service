import mongoose from 'mongoose';
import {roleSchema} from "./role";

export const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    status: String,
    role: roleSchema
});

export const User = mongoose.model('User', userSchema);