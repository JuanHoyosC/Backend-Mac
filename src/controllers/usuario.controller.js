const Usuario = require('../models/usuario.model');
const UsuarioNuevo = require('../models/usuarioNuevo.model');
const jwt = require('jsonwebtoken');
const usuarioController = {}


usuarioController.crearUsuario = async (req, res) => {
    const { nombre, clave, confirmarClave, correo, confirmarCorreo, telefono, iD } = req.body;
    const buscarCorreo = await Usuario.findOne({ correo: correo });
    const buscarCorreoNuevo = await UsuarioNuevo.find({correo: correo});

    if (!buscarCorreoNuevo) return res.status(401).json({status: 'El correo no ha sido asignado por el lider o asesor'})
    if(buscarCorreoNuevo.clave != iD) return res.status(401).json({status: 'El id no coincide con el lides o asesor que lo registro'})
    if (buscarCorreo) return res.status(401).json({ status: "El correo ya existe" })
    if (correo != confirmarCorreo) return res.status(401).json({ status: "Los correos no coinciden" })
    if (clave != confirmarClave) return res.status(401).json({ status: "Las contraseñas no coinciden" })
    if (nombre.lenght == 0 || clave.lenght == 0 || confirmarClave.lenght == 0 || correo.lenght == 0 || confirmarCorreo.lenght == 0
        || telefono.lenght == 0 || iD.lenght == 0) return res.status(401).json({ status: "No debe dejar campos vacios" })

    const usuario = new Usuario({ nombre, clave, correo, telefono, iD });
    usuario.clave = await usuario.encriptarClave(clave);
    await usuario.save();

    return res.status(200).json({ status: 'Usuario guardado' });
}

usuarioController.buscarUsuario = async (req, res) => {
    const conectado = req.headers.authorization.split(' ')[1];
    if (conectado != null) return res.status(401).json({ status: 'Acesso denegado' })

    const { correo, clave } = req.body;
    const usuario = await Usuario.findOne({ correo: correo });

    if (!usuario) return res.status(401).send('El correo no existe');
    const match = await usuario.mathClave(clave);
    if (!match) return res.status(401).send('Contraseña incorrecta')
    const token = jwt.sign({ _id: usuario._id }, 'secretkey');
    return res.status(200).json({ token: token });
}

usuarioController.crearUsuarioNuevo = async (req, res) => {
    const { correo, clave} = req.body;
    const buscarCorreo = await UsuarioNuevo.findOne({ correo: correo });

    if (buscarCorreo) return res.status(401).json({ status: `El correo ${correo} ya existe` })
    if (clave.lenght == 0 || correo.lenght == 0) return res.status(401).json({ status: "No debe dejar campos vacios" })

    const usuario = new UsuarioNuevo({ correo, clave});
    usuario.clave = await usuario.encriptarClave(clave);
    await usuario.save();

    return res.status(200).json({ status: 'Usuario guardado' });
}



module.exports = usuarioController