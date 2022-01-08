const userCtrl = {}
const jwt = require('jsonwebtoken')
const User = require('../models/user')

//registrarse

userCtrl.signUp = async (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password })
    await newUser.save();
    const token = jwt.sign({ _id: newUser._id }, 'secretKey')
    res.status(200).json({ token })

}

// logearse

userCtrl.signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) return res.status(401).send('Correo no existe');
    if (user.password !== password) return res.status(401).send('Contraseña no existe')
    const token = jwt.sign({ _id: user._id }, 'secretKey')
    res.status(200).json({ token })
}


module.exports=userCtrl;