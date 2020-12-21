const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const models = require("../models");

exports.list = async (req, res, next) => {
  try {
    const registro = await models.Articulo.findAll();
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

exports.add = async (req, res, next) => {
  try {
    const registro = await models.Articulo.create(req.body);
    res.status(200).json(registro);
  } catch (error) {
    res.status(500).send({
      message: 'Error!'
    })
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const registro = await models.Articulo.findOne({ where: { id: req.body.id } });
    if (registro) {
      const registro = await models.Articulo.update({ codigo: req.body.codigo, nombre: req.body.nombre, descripcion: req.body.descripcion, categoriadId: req.body.categoriadId}, { where: { id: req.body.id } });
      res.status(200).json(registro);
    } else {
      res.status(404).send({
        message: "There is no register in the system."
      })
    }
  } catch (error) {
    res.status(500).send({
      message: "Error!"
    })
    next(error);
  }
};

exports.activate = async (req, res, next) => {
  try {
    const registro = await models.Articulo.findOne({ where: { id: req.body.id } });
    if (registro) {
      const registro = await models.Articulo.update({ estado: 1 }, { where: { id: req.body.id } });
      res.status(200).json(registro);
    } else {
      res.status(404).send({
        message: "There is no register in the system."
      })
    }
  } catch (error) {
    res.status(500).send({
      message: "Error!"
    })
    next(error);
  }
};

exports.deactivate = async (req, res, next) => {
  try {
    const registro = await models.Articulo.findOne({ where: { id: req.body.id } });
    if (registro) {
      const registro = await models.Articulo.update({ estado: 0 }, { where: { id: req.body.id } });
      res.status(200).json(registro);
    } else {
      res.status(404).send({
        message: "There is no register in the system."
      })
    }
  } catch (error) {
    res.status(500).send({
      message: "Error!"
    })
    next(error);
  }
};