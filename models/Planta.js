const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  pais: {
    type: String,
    required: true,
  },
  nombre_de_planta:{
    type: String,
    required: true,
  }
});



const Planta = mongoose.model('Planta', userSchema);

module.exports = Planta;