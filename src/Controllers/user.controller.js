const userCtrl = {}
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
require('dotenv').config()

const emailout = process.env.USER
const passwordout = process.env.PSW
const EMAIL_SECRET = process.env.EMAIL_SECRET

//registrarse

userCtrl.signUp = async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email })
    if (!user) {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password.toString(), salt);
        let newUser = new User({ email, password })
        newUser.save((function (_id) {
            return function () {

                // your save callback code in here
            };
        })(newUser._id));
        console.log(newUser._id);
        const emailToken = jwt.sign(
            {
                user: newUser._id
            },
            String(EMAIL_SECRET),
            {
                expiresIn: '1d'
            }
        );
        console.log('outside ' + emailToken);

        // Crear un token


        //enviar mail de confirmacion
        const url = `http://192.168.1.181:4200/confirmation/${emailToken} `
        contentHTML = `<h1>User information</h1>
            <ul>
                <li>email : ${email} </li>
                <li>password ${password}</li>
            </ul>
            <p>¡Enhorabuena te hemos aceptado en el club! Entra en este enlace para validad tu jodida cuenta:</br> <a href="${url}">${url}</a></p> `;

        // email sender function

        // Definimos el transporter
        var transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            auth: {
                user: emailout ,
                pass: passwordout
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        var mailOptions = {
            from: emailout,
            to: email,
            subject: '[Bienvenida a casa] Email de confirmación',
            html: contentHTML
        };
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.send(500, error.message);
            } else {
                console.log("Email sent");
                res.status(200).jsonp(req.body);
            }
        });
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
    if (!user.confirmed) {
        res.status(401).send('please confirm user')
    } else {
        await bcrypt.compare(password, user.password)
            .then((result) => {
                if (result == true) {
                    const token = jwt.sign({ _id: user._id }, 'secretKey');
                    res.status(200).json({ token });
                } else {
                    res.status(404).send('Contraseña incorrecta')
                }
            }
            )
    }
}

userCtrl.confirmation = async (req, res) => {
    console.log('uh baby baby');
    try {
        const { user: { id } } = jwt.verify(req.params.token, EMAIL_SECRET)
        console.log('entra');
        await User.findByIdAndUpdate(id, { confirmed: true })
            .then(() => {
                res.status(200);
                console.log('confirmado')

            })
    } catch {
        res.send('la cagada')
    }
    return res.redirect('http://localhost:4200/task')

}

module.exports = userCtrl;