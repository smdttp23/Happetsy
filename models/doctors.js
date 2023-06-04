const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name:String,
    image:String,
    phnnum:Number,
    description:String,
    location:String
});

module.exports = mongoose.model('vetDoc', doctorSchema);