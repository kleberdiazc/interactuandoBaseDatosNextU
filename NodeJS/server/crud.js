var Usuario = require('./modelUsuarios.js') //Asignarle a la variable USUARIO el modelo del usuario

module.exports.crearUsuarioDemo = function(callback){ //Función para crear usuarios
  var arr = [{ email: 'kleber@mail.com', user: "kleber", password: "1234"}, { email: 'melissa@mail.com', user: "melissa", password: "1234"}];
  Usuario.insertMany(arr, function(error, docs) {
    if (error){
      if (error.code == 11000){
        callback("Utilice los siguientes datos: </br>usuario: kleber | password:1234 </br>usuario: melissa | password:1234") //Mostrar mensaje
      }else{
        callback(error.message) //Mostrar mensaje de error
      }
    }else{
      callback(null, "Usuarios Ingresados Correcatmente") //Mostrar mensaje del usuario guardado con exito
    }
  });
}
