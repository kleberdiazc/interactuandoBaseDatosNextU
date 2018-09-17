
const http = require('http');
      path = require('path'),
      express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      MongoClient = require('mongodb').MongoClient,
      mongoose = require('mongoose'),
      autoIncrement = require('mongoose-auto-increment')

	mongoose.connect('mongodb://localhost/agenda_db', {useMongoClient: true}, function(error){
      if(error){
            console.log(error.name +" "+ error.message);
      }else{
              console.log('Conectado a MongoDB');
           }
        });

autoIncrement.initialize(mongoose.connection);
const RoutingUsers = require('./rutasUsuarios.js'),
      RoutingEvents = require('./rutasEventos.js')

const PORT = 3000
const app = express()

const Server = http.createServer(app)
app.use(express.static('../client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(session({
    secret: 'secret-pass', //Cadena de caracteres secreta para firmar el Identificador de la sesión cookie
    cookie: { maxAge: 3600000 }, //Mantener las cookies de la sesión iniciada por una hora
    resave: false,
    saveUninitialized: true
  }));

app.use('/usuarios', RoutingUsers) //Incluir el módulo usuarios y definir su directorio raíz como /usuarios
app.use('/events', RoutingEvents) //Incluir el módulo eventos bajo y definir su directorio raíz como /events

Server.listen(PORT, function() {
  console.log('Server is listening on port: ' + PORT)
})
