const mongoose = require('mongoose');

const ENTORNO = require("../config.json")


<<<<<<< HEAD
mongoose.connect('mongodb://192.168.1.181:27017/angular-auth', {
=======
mongoose.connect('mongodb+srv://'+ENTORNO.PRODUCCION.bbdduser+':'+ENTORNO.PRODUCCION.bbddpsw+'@cluster0.tqdy8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
>>>>>>> 533debc48ecf3926a5f085d3f956c8f31908fd68
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,


})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err))