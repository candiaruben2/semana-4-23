const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { model } = require("../models");

exports.list = async(req, res, next) => {
  try {
    const registro = await model.Categoria.findAll();
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
    const registro = await model.Categoria.create(req.body);
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
    const registro = await model.Categoria.findOne({where: {id:req.body.nombre}});
    if (registro) {
      res.status(200).json(registro);
    } else {
      res.status(404).send({
        message: "There is no register in the system"
      })
    }
  } catch (error) {
    res.status(500).send({
      message: "Error"
    })
    next(error);
  }
};
