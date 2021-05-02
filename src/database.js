const mongoose =require('mongoose');



mongoose.connect('mongodb+srv://Guillermo:Ragnarson11@cluster0.tqdy8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    

})
.then(db => console.log('Database is connected'))
.catch(err=> console.log(err))