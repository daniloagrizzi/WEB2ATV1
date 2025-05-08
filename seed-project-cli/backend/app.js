const express = require("express");
const bodyParser = require("body-parser");
var path = require('path');
const session = require('express-session'); 

const userRoutes = require('./routes/user'); 
const appRoutes = require('./routes/app');
const messageRoutes = require('./routes/messages');

const app = express();
const mongoose = require('mongoose');

// Configuração de sessão
app.use(session({
  secret: 'your_secret_key', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// Configuração do motor de visualização
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middleware para bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cors configuration
const cors = require('cors');
app.use(cors({
  // Allow Angular app running on localhost:4200 as well as the firebase-hosted URL
  origin: [
    'http://localhost:4200',
    'https://firebase-approsalengit-1746666134793.cluster-m7tpz3bmgjgoqrktlvd4ykrc2m.cloudworkstations.dev'
  ],
  credentials: true
}));

// Configuração de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// API Routes - Ensure all API routes are prefixed with /api
app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);  // IMPORTANT: Use /api/messages prefix
app.use('/', appRoutes);

// Catch-all route for Angular app routing
app.use(function (req, res, next) {
  // Check if this is an API request
  if (req.url.startsWith('/api/')) {
    return res.status(404).json({ message: 'API endpoint not found' });
  }
  
  // For non-API requests, render the index view (for Angular SPA)
  return res.render('index');
});

module.exports = app;