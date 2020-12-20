const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const models = require("../models");

exports.login = async (req, res, next) => {
  try {
    const usuario = await models.usuario.findOne({
      where: { email: req.body.email }
    });
    if (usuario) {
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        usuario.password
      );
      if (passwordIsValid) {
        const token = jwt.sign(
          {
            id: usuario.id,
            name: usuario.name,
            email: usuario.email,
            rol: usuario.rol
          },
          "config.secret",
          {
            expiresIn: 86400
          }
        );
        res.status(200).send({
          auth: true,
          accesToken: token
          //usuario: usuario
        });
      } else {
        res.status(401).json({
          error: "Error en el usuario o contraseña"
        });
      }
    } else {
      res.status(404).json({
        error: "Error en el usuario o contraseña"
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error->"
    });
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
  } catch (error) {}
};
exports.listar = async (req, res, next) => {
  try {
  } catch (error) {}
};
//const usuario = require('../models');
