const express= require('express');
const app = express();
const cors= require ('cors');

const database = require('./database')
app.use (cors());
app.use (express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });

app.use('/api',require('./routes/index'))

app.listen(3000);
console.log('server on port',3000);