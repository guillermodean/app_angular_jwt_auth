const {Schema,model}=require('mongoose');

const userSchema = new Schema({
    _id:String,
    name:String,
    description:String,
    date:Date
});

module.exports = model('Tasks',userSchema);