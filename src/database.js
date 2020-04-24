const moongoose = require('mongoose');

moongoose.connect('mongodb://localhost/mac', {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.log(err))