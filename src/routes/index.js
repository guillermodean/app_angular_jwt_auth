const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
const listaCtrl = require('../Controllers/lista.controller')
const taskCtrl = require('../Controllers/task.controller')
const userCtrl = require('../Controllers/user.controller')
const weatherCtrl = require('../Controllers/weather.controller')

require('dotenv').config()


router.get('/', (req, res) => res.send('Wellcome'))

// users

router.post('/signup', userCtrl.signUp)

router.post('/signin', userCtrl.signIn)

router.get('/confirmation/:token', userCtrl.confirmation)

// Taks

router.get('/tasks', taskCtrl.getTask)

router.post('/tasks', taskCtrl.postTask)

router.delete('/tasks/:id', taskCtrl.deleteTask)

router.get('/tasks/:id', taskCtrl.getOneTask)

router.put('/tasks/:id', taskCtrl.updateTask)

//weather

router.get('/weather', weatherCtrl.getWeather)

// Lista de la compra

router.get('/lista', listaCtrl.getLista)

router.get('/lista/:id', listaCtrl.getListaone)

router.put('/lista/:id', listaCtrl.putListaone)

router.post('/lista', listaCtrl.addListaone)

router.delete('/lista/:id', listaCtrl.delListaone)

// profile

router.get('/profile', verifyToken, (req, res) => {
    res.send(req.userId);

})



function verifyToken(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    const token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('la cabecera está vacia');

    }
    const payload = jwt.verify(token, 'secretKey');
    req.userId = payload._id;  //creo una propiedad en req y le paso el valor id de payload
    next();
};
module.exports = router