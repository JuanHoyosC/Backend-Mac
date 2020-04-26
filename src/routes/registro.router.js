const express = require('express')
const router = express.Router();
const usuarioCtrl = require('../controllers/usuario.controller');
const jwt = require('jsonwebtoken');

router.post('/registro', verifyToken, (req, res) => { usuarioCtrl.crearUsuario(req, res) });
router.post('/registro/nuevo', (req, res) => { usuarioCtrl.crearUsuarioNuevo(req, res) });

function verifyToken(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json({ status: 'Acceso denegado' });
    const token = req.headers.authorization.split(' ')[1];
    if (token == 'null') return res.status(401).json({ status: 'Acceso denegado' });

    const playload = jwt.verify(token, 'secretkey')
    if (!payload) return res.status(401).json({ status: 'Acceso denegado' });
    next();
}


module.exports = router