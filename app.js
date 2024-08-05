const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
const userRoute = require('./routes/userRoute');
const plantaRoute = require('./routes/plantaRoute');
const cors = require('cors');
app.use(cors({
  origin : '*'
}))



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
dotenv.config();
app.use('/challenge-au/auth', userRoute);
app.use('/challenge-au/planta', plantaRoute);




mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'));









const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));