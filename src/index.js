const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

require('./database');
//Configuracion
app.set('port', 3000 || process.env.PORT)

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use(require('./routes/login.router'));
app.use(require('./routes/registro.router'));

app.listen(app.get('port'), ()=>{
    console.log("servidor conectado en el puerto 3000")
});