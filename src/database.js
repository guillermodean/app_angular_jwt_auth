const mongoose = require('mongoose');

const ENTORNO = require("../config.json")


mongoose.connect('mongodb+srv://'+ENTORNO.PRODUCCION.bbdduser+':'+ENTORNO.PRODUCCION.bbddpsw+'@cluster0.tqdy8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,


})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err))