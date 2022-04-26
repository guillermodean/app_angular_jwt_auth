const {Schema,model}=require('mongoose');

const listaSchema = new Schema({
    // _id: String,
    Producto: String,
    Marca: String,
    Cantidad: Number,
    Check: Boolean
});

module.exports = model('Lista',listaSchema);