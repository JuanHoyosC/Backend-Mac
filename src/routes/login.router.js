const express = require('express')
const router = express.Router();
const usuarioCtrl = require('../controllers/usuario.controller');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    usuarioCtrl.buscarUsuario(req, res)
});


module.exports = router