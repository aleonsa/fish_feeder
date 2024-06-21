require('dotenv').config();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos.');
});

// Datos del usuario a crear
const username = 'admin'; // Reemplaza esto con el nombre de usuario deseado
const plainPassword = 'admin'; // Reemplaza esto con la contraseña deseada

// Encriptar la contraseña
bcrypt.hash(plainPassword, 10, (err, hashedPassword) => {
  if (err) {
    console.error('Error encriptando la contraseña:', err);
    return;
  }

  // Insertar el usuario en la base de datos
  const query = 'INSERT INTO Users (username, password) VALUES (?, ?)';
  connection.query(query, [username, hashedPassword], (err, results) => {
    if (err) {
      console.error('Error insertando el usuario en la base de datos:', err);
      return;
    }
    console.log('Usuario creado con éxito:', results);
    connection.end(); // Cerrar la conexión
  });
});