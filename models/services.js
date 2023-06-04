const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicesSchema = new Schema({
    name:String,
    image:String,
    price:Number,
    description:String,
    location:String
});

module.exports = mongoose.model('services', servicesSchema);