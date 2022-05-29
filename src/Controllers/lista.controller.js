const listaCtrl = {}
const Lista = require('../models/lista')

//Get all

listaCtrl.getLista = async (req,res)=>{
    const alllista = await Lista.find()
    res.status(200).json(alllista);
}
// add producto
listaCtrl.addListaone = async (req,res)=>{
    const { Producto,Marca,Cantidad,Check } = req.body;
    console.log(Producto,Marca,Cantidad,Check);
    const newLista = new Lista({ Producto,Marca,Cantidad,Check})
    await newLista.save()
        .then(() => {
            res.status(200).json({ newLista });
            console.log('añadida nueva lista');
        })

    
}
//update one
listaCtrl.putListaone = async (req,res)=>{
    const id = req.params.id;
    const body = req.body
    try {
        await Lista.findByIdAndUpdate(id, body).exec()
        res.status(200).json({"message":"updated"})
        console.log('actualizada');
    } catch (err) {
        console.log(err);
    }
    
    
}
//delete one
listaCtrl.delListaone = async (req,res)=>{
    const id = req.params.id
    console.log(id)
    try {
        await Lista.findByIdAndDelete(id)
            .then(() => {
                res.status(200).json({ message: 'borrado' });
                console.log('borrado')
            });
    } catch (err) {
        console.log(err);
    }
    
}
//add one
listaCtrl.getListaone = async (req,res)=>{
    const id = req.params.id
    const id2 = ('ObjectId("' + id + '")');
    const oneLista = await Lista.findById(id).exec()
    console.log(oneLista);
    res.status(200).json(oneLista);

    
}
//get one

module.exports = listaCtrl;