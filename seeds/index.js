const mongoose = require('mongoose');
// const services = require('../models/services');
const vetDoc= require('../models/doctors');
const doc = require('./doctor');
// const vetserv = require('./services');
mongoose.connect('mongodb://127.0.0.1:27017/doctors', {
    useNewUrlParser: true, useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
    console.log("Connected");
});
const seedDB = async () => {
    await vetDoc.deleteMany({});
    // await services.deleteMany({});
    for (let i = 0; i < 15; i++) {
        const phnnum = Math.floor(Math.random()*10000000);
        console.log(doc[i].name);
        const doctor = new vetDoc({
            location: `${doc[i].location}`,
            name: `${doc[i].name}`,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/813px-Unknown_person.jpg?20200423155822',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex illo expedita molestias numquam nesciunt sapiente ad culpa, aspernatur, saepe, magni praesentium eaque aut vel reiciendis delectus veniam veritatis cum fugiat?',
            phnnum
        })
        await doctor.save();
        console.log('saved')
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});

