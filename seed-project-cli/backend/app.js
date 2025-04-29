const express = require("express");
const bodyParser = require("body-parser");
var path = require('path');

const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/user');


var appRoutes = require('./routes/app');

const app = express();


// NOVO
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/MyMongoDB')
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Erro na conexão com o MongoDB:', error);
  });
// NOVO

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Configuração do CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

/*const cors = require('cors');

app.use(cors({
  origin: 'https://4200-idx-trabalho-mensagens-1744654541230.cluster-4xpux6pqdzhrktbhjf2cumyqtg.cloudworkstations.dev',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true 
}));*/



app.use('/api/message', messageRoutes);
app.use('/api/autenticacao',userRoutes);
app.use('/', appRoutes);


// catch 404 and forward to error handler')

// catch 404 and forward to error handler 
app.use(function (req, res, next) {
  return res.render('index');
});

module.exports = app;
 