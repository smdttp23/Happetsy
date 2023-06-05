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
mongoose.createConnection('mongodb://127.0.0.1:27017/services', {
    useNewUrlParser: true, useUnifiedTopology: true
});

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
app.use( express.static( "public" ) );
app.use('/public', express.static(__dirname + "/public"));
app.get('/', (req, res) => {
    res.render('main/home');
})
app.get('/doctors',async (req,res)=>{
    const doc = await vetdoc.find({});
    res.render('doctors/show', {doc});
})
app.get('/shop', async (req,res)=>{
    const items = await vetserv.find({});
    res.render('servicesvet/ser_show',{items});
})
app.get('/login', (req,res)=>{
    res.render('signin/login')
})
app.get('/doctors/:id',async (req,res)=>{
    const doc = await vetdoc.findById(req.params.id);
    res.render('doctors/det', {doc});
})
app.get('/shop/:id',async (req,res)=>{
    const item = await vetserv.findById(req.params.id);
    res.render('servicesvet/prod_det', {item});
})


app.listen(8000,()=>{
    console.log("Listening on 8051 port");
})