const config = require("../secret/config.js")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const models = require("../models");
//const auth = require("../middlewares/auth.js");
const auth = require('../middlewares/auth');

//console.log(res(models.Categoria.findAll));
exports.list = async (req, res, next) => {
  try {
    const registro = await models.Usuario.findAll();
    if (registro) {
      res.status(200).json(registro);
    } else {
      res.status(404).send({
        message: "There is no register in the system"
      })
    }
  } catch (error) {
    res.status(500).send({
      message: "Error!"
    })
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const usuario = await models.Usuario.findOne({ where: { email: req.body.email } });
    if (usuario) {
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        usuario.password
      );
      //auth.verifyUsuario;
      const token = jwt.sign(
        {
          id: usuario.id,
          name: usuario.nombre,
          email: usuario.email,
          password: usuario.password,
          rol: usuario.rol
        },
        "config.secret",
        {
          expiresIn: 86400
        }
      );
      if (passwordIsValid) {
        res.status(200).send({
          auth: true,
          tokenReturn: token
          //usuario: usuario
        });
      } else {
        res.status(401).json({
          error: "Error en el usuario o contraseña",
        });
      }
    } else {
      res.status(404).json({
        error: "Error en el usuario o contraseña"
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error"
    });
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const registro = await models.Usuario.create(req.body);
    res.status(200).json(registro);
  } catch (error) {
    res.status(500).send({
      message: 'Error!'
    })
    next(error);
  }
};
//const usuario = require('../models');
