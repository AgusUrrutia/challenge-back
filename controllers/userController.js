const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Respuesta esto es lo que trae: ", req.body);

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    user = new User({ name, email, password });
    await user.save();

    const payload = {
      user: {
        name: user.name
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h'
      //Deberia actualizarlo cada vez que se realiza una transaccion de planta
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Respuesta esto es lo que trae: ", req.body);

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'No pertenece a un usuario registrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password incorrecta' });
    }
    const payload = {
      user: {
        name: user.name
      }
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h'
      //Deberia actualizarlo cada vez que se realiza una transaccion de planta
    });

    res.json({ token, name: user.name });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};
