const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  name_plant:{
    type: String,
    required: true,
  }
});



const Planta = mongoose.model('Planta', userSchema);

module.exports = Planta;