var jwt = require('jsonwebtoken');
const models = require('../models');
const config = require("../secret/config.js")

const checkToken = async (token) => {
    let localID = null;
    try {
        const { id } = await token.decode(token);
        localID = id;
    } catch (error) {

    }
    const usuario = await models.Usuario.findOne({ where: { id: localID, estado: 1 } })
    if (usuario) {
        const token = encode(usuario)
        return {
            token,
            rol: usuario.rol
        }
    } else {
        return "Token no encontrado"
    }
}

module.exports = {

    //generar el token
    //id, rol
    encode: async (req,res,next) => {
        console.log(req.body);
        const token = jwt.sign({
            email: req.body.email,
            password: req.body.password,
            rol: req.body.rol
        }, 'config.secret', { expiresIn: 86400, });
        return token;
    },
    //permite decodificar el token
    decode: async (token) => {
        console.log(token)
        try {
            const { id } = await jwt.verify(token, 'config.secret');
            const usuario = await models.Usuario.findOne({ where: { id: id, estado: 1 } })
            if (usuario) {
                return usuario;
            } else {
                return falso;
            }
        } catch (e) {
            const newToken = await checkToken(token);
            return newToken
        }

    }
}