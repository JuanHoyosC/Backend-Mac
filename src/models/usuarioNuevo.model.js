const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioNuevoSchema = new Schema({
    correo: {type: String, required: true},
    clave: {type: String, required: true}
},{
    timestamps: true
});

usuarioNuevoSchema.methods.encriptarClave = async (clave) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(clave, salt);
}

usuarioNuevoSchema.methods.mathClave = async function(clave) {
    return await bcrypt.compare(clave, this.clave)
}

module.exports = model('usuariosNuevos', usuarioNuevoSchema);