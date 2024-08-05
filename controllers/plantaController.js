const Planta = require('../models/Planta');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getAll = async (req, res) => {
  console.log("Peticion");
  
  try {
    const plantas = await Planta.find();
    res.json(plantas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

exports.post = async (req, res) => {
  const { country, name_plant } = req.body;
  try {
    const newPlanta = new Planta({ country, name_plant });
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
  const { country, name_plant } = req.body;
  try {
    let planta = await Planta.findById(id);
    if (!planta) {
      return res.status(404).json({ message: 'Planta no encontrada' });
    }

    planta.country = country || planta.country;
    planta.name_plant = name_plant || planta.name_plant;

    await planta.save();
    res.json(planta);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

