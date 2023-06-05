const mongoose = require('mongoose');
// const services = require('../models/services');
const vetDoc = require('../models/doctors');
const item = require('../models/services')
const { doctors, shop } = require('./seedhelper');
const { v4: uuid } = require('uuid');
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
        const phnnum = Math.floor(Math.random() * 10000000);
        console.log(doctors[i].name);
        const doctor = new vetDoc({
            id: uuid(),
            location: `${doctors[i].location}`,
            name: `${doctors[i].name}`,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/813px-Unknown_person.jpg?20200423155822',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex illo expedita molestias numquam nesciunt sapiente ad culpa, aspernatur, saepe, magni praesentium eaque aut vel reiciendis delectus veniam veritatis cum fugiat?',
            phnnum
        })
        await doctor.save();
        console.log('saved')
    }
}
// }
// const seedDB2 = async () => {
//     await item.deleteMany({});
//     // await services.deleteMany({});
//     for (let i = 0; i < 15; i++) {
//         const price = Math.floor(Math.random()*1000);
//         console.log(shop[i].name);
//         const shopitem = new item({
//             id: uuid(),
//             name: `${shop[i].name}`,
//             image: `${shop[i].image}`,
//             description:`${shop[i].description}`,
//             price
//         })
//         await shopitem.save();
//         console.log('saved')
//     }
// }

seedDB().then(() => {
    // mongoose.connection.close();
});
mongoose.connect('mongodb://127.0.0.1:27017/doctors', {
    useNewUrlParser: true, useUnifiedTopology: true
});
const db2 = mongoose.connection;
db2.on("error", console.error.bind(console, "Connection error"));
db2.once("open", () => {
    console.log("Connected");
});

const seedDB2 = async () => {
    await item.deleteMany({});
    // await services.deleteMany({});
    for (let i = 0; i < 14; i++) {
        const price = Math.floor(Math.random() * 1000);
        console.log(shop[i].name);
        const shopitem = new item({
            id: uuid(),
            name: `${shop[i].name}`,
            image: `${shop[i].image}`,
            description: `${shop[i].description}`,
            price
        })
        await shopitem.save();
        console.log('saved')
    }
    seedDB2().then(() => {
        mongoose.connection.close();
    });
}
seedDB2().then(()=>{
    mongoose.connection.close();
})
