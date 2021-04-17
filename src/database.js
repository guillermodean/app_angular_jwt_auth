const mongoose =require('mongoose');


mongoose.connect('mongodb://192.168.1.130/angular-auth',{
    useNewUrlParser:true,
    useUnifiedTopology:true

})
.then(db => console.log('Database is connected'))
.catch(err=> console.log(err))