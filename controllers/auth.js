const { response } = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
  const { name, email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    console.log("usuario:", usuario);

    if (!!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario ya existe con ese correo",
      });
    }

    usuario = new Usuario(req.body);

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    const token = await generarJWT(usuario.id, usuario.name);

    // Generar JWT

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });
  } catch (error) {
    console.log("crearUsuario:", error);

    res.status(500).json({
      ok: false,
      msg: "Contacte con el administradro del sistema.",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario y contraseña son incorrectos",
      });
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    //Generar el JWT

    const token = await generarJWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      uid: usuario.id,
      name:usuario.name,
      token
    });

  } catch (error) {

  }
};

const revalidarToken = async (req, res = response) => {

  const uid = req.uid;
  const name = req.name;

  //Generar un nuevo JWT y retornalo
  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    token
  });

};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
