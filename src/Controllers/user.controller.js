const userCtrl = {}
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt');

//registrarse

userCtrl.signUp = async (req, res) => {
    let { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password.toString(), salt);
        const newUser = new User({ email, password })
        newUser.save();
        const token = jwt.sign({ _id: newUser._id }, 'secretKey')
        res.status(200).json({ token })

    }
    else return res.status(401).send('el usuario ya existe en la aplicación')



}

// logearse

userCtrl.signIn = async (req, res) => {
    
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) return res.status(401).send('Correo no existe');
    console.log(password, user.password);
    await bcrypt.compare(password, user.password)
        .then((result) => {
            if (result == true) {
                const token = jwt.sign({ _id: user._id }, 'secretKey');
                res.status(200).json({ token });
            } else {
                res.status(404).send('Contraseña incorrecta')
            }
            // if (user.password !== password) return 
            // res.status(401).send('Contraseña no existe')

        }
        )
}



module.exports = userCtrl;