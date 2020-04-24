const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new Schema({
    nombre: {type: String, required: true},
    contraseña: {type: String, required: true},
    correo: {type: String, required: true},
    telefono: {type: Number, required: true},
    iD: {type: Number, required: true}
},{
    timestamps: true
});

usuarioSchema.methods.encriptarContraseña = async (contraseña) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(contraseña, salt);
}

usuarioSchema.methods.mathContraseña = async function(contraseña) {
    await bcrypt.compare(contraseña, this.contraseña)
}

module.exports = model('usuerios', usuarioSchema);