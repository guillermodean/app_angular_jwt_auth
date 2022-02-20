const https = require('https');
const request = require('request')
const weatherCtrl = {}


// Get all tasks
weatherCtrl.getWeather = async (req, res) => {
    request("https://api.openweathermap.org/data/2.5/weather?q=Pamplona,es&appid=a7ce59d0350ce5cab2d235463756ea21&units=metric", (err, response, body) => {
        res.status(200).json(JSON.parse(body));
    })
}
module.exports = weatherCtrl;