const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

require('./database');

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use(require('./routes/login.router'));



app.listen(3000, ()=>{
    console.log("servidor conectado en el puerto 3000")
});