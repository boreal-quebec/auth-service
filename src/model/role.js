import mongoose from "mongoose";


export const roleSchema = new mongoose.Schema({
    name: String,
});


export const Role = mongoose.model('Role', roleSchema);