const Planta = require('../models/Planta');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getAll = async (req, res) => {
  
  try {
    const plantas = await Planta.find();
    res.json(plantas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

exports.post = async (req, res) => {
  const { pais, nombre_de_planta } = req.body;
  console.log(req.body);
  
  try {
    const newPlanta = new Planta({ pais, nombre_de_planta });
    await newPlanta.save();
    res.json(newPlanta);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

// Actualizar una planta existente
exports.update = async (req, res) => {
  const { id } = req.params;
  const { pais, nombre_de_planta } = req.body;
  try {
    let planta = await Planta.findById(id);
    if (!planta) {
      return res.status(404).json({ message: 'Planta no encontrada' });
    }

    planta.pais = pais || planta.pais;
    planta.nombre_de_planta = nombre_de_planta || planta.nombre_de_planta;

    await planta.save();
    res.json(planta);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

