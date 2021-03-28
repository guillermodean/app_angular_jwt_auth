const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
const { restart } = require('nodemon')
const user = require('../models/user')

const User = require('../models/user')

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
    res.status(200).json({token})
})

router.get('/tasks', async (req,res)=>{
    res.json([
        {
            _id:1,
            name:'Task one',
            description: 'lorem ipsum',
            date:"2021-03-28T19:15:41.303Z"
        },
        {
            _id:2,
            name:'Task two',
            description: 'lorem ipsum',
            date:"2021-03-28T19:15:41.303Z"
        },
        {
            _id:3,
            name:'Task three',
            description: 'lorem ipsum',
            date:"2021-03-28T19:15:41.303Z"
        },
        {
            _id:4,
            name:'Task four',
            description: 'lorem ipsum',
            date:"2021-03-28T19:15:41.303Z"
        }
    ])
})
router.get('/private-tasks',verifyToken,async (req,res)=>{
    res.json([
        {
            _id:1,
            name:'Task one',
            description: 'lorem ipsum',
            date:"2021-03-28T19:15:41.303Z"
        },
        {
            _id:2,
            name:'Task two',
            description: 'lorem ipsum',
            date:"2021-03-28T19:15:41.303Z"
        },
        {
            _id:3,
            name:'Task three',
            description: 'lorem ipsum',
            date:"2021-03-28T19:15:41.303Z"
        },
        {
            _id:4,
            name:'Task four',
            description: 'lorem ipsum',
            date:"2021-03-28T19:15:41.303Z"
        }
    ])
})
router.get('/profile', verifyToken,(req,res)=>{
    res.send(req.userId);

})

module.exports = router

function verifyToken(req,res,next) {

    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    const token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
        return res.status(401).send('la cabecera estávacian');

    }
    const payload = jwt.verify(token,'secretKey');
    req.userId=payload._id;  //creo una propiedad en req y le paso el valor id de payload
    next(); 
};
