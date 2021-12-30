const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
var ObjectId = require('mongodb').ObjectID;


const User = require('../models/user')
const Tasks = require('../models/Tasks')
const Tareas = require('../models/Tasks')

router.get('/', (req, res) => res.send('helloworld'))

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password })
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, 'secretKey')

    res.status(200).json({ token })

})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) return res.status(401).send('Correo no existe');
    if (user.password !== password) return res.status(401).send('Contraseña no existe')
    const token = jwt.sign({ _id: user._id }, 'secretKey')
    res.status(200).json({ token })
})

router.get('/tasks', async (req, res) => {
    const allTasks = await Tasks.find()
    res.status(200).json(allTasks);
})

router.get('/private-tasks', verifyToken, async (req, res) => {
    const Tasks = await Tasks.find()
    res.send(Tasks);
})

router.post('/tasks', async (req, res) => { //OK
    const { _id, name, description, date } = req.body;
    const newTask = new Tasks({ _id, name, description, date })
    await newTask.save();
    res.status(200).json({ newTask })
})

router.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        await Tasks.findByIdAndDelete(id)
            .then(() => { 
                res.status(200);
                console.log('borrado')
                 });
    } catch (err) {
        console.log(err);
    }
})

router.get('/profile', verifyToken, (req, res) => {
    res.send(req.userId);

})

router.get('/tasks/:id', async (req, res) => {
    const id = req.params.id
    const id2 = ('ObjectId("'+ id +'")');
    console.log(id2);
    const oneTask = await Tasks.findById(id).exec()
    console.log(oneTask)
    res.status(200).json(oneTask);
})

module.exports = router

function verifyToken(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    const token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('la cabecera estávacian');

    }
    const payload = jwt.verify(token, 'secretKey');
    req.userId = payload._id;  //creo una propiedad en req y le paso el valor id de payload
    next();
};
