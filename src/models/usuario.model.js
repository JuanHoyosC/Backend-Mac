const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new Schema({
    nombre: {type: String, required: true},
    clave: {type: String, required: true},
    correo: {type: String, required: true},
    telefono: {type: Number, required: true},
    iD: {type: Number, required: true}
},{
    timestamps: true
});

usuarioSchema.methods.encriptarClave = async (clave) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(clave, salt);
}

usuarioSchema.methods.mathClave = async function(clave) {
    return await bcrypt.compare(clave, this.clave)
}

module.exports = model('usuarios', usuarioSchema);