const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const vetdoc = require('./models/doctors');
const vetserv = require('./models/services');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

mongoose.connect('mongodb://127.0.0.1:27017/doctors', {
    useNewUrlParser: true, useUnifiedTopology: true
});
// mongoose.createConnection('mongodb://127.0.0.1:27017/services', {
//     useNewUrlParser: true, useUnifiedTopology: true
// });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
    console.log("Connected");
});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.render('main/home');
})
app.get('/doctors',(req,res)=>{
    res.render('doctors/show');
})
app.get('/services',(req,res)=>{
    res.render('servicesvet/ser_show');
})
app.listen(8000,()=>{
    console.log("Listening on 8051 port");
})