const mongoose = require('mongoose');

const ENTORNO = require("../config.json")


mongoose.connect('mongodb://192.168.1.181:27017/angular-auth', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,


})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err))