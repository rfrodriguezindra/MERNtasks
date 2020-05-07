const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

// Fx crear usuario
exports.crearUsuario = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    // Extraer email y passwords
    const {email, password} = req.body;

    try {
        // Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({email});
        if (usuario){
            return res.status(400).json({msg: 'El usuario ya existe'});
        }
        // Crea el nuevo usuario
        usuario = new Usuario(req.body);
        // Encriptar el pass
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);
        // Guarda usuario
        await usuario.save();

        // Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        // Firmar
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) =>{
            if (error) throw error;

            // Mensaje de confirmacion
            res.json({token});
        });

        
    } catch(error){
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}