const mysql = require('mysql');
const bcrypt = require('bcrypt');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const checkCredentials = (username, providedPassword) => {
    return new Promise((resolve, reject) => {
      // Modificamos la consulta para obtener solo el usuario por username
      const query = 'SELECT password FROM Users WHERE username = ?';
      
      connection.query(query, [username], async (error, results) => {
        if (error) {
          reject(error);
        } else if (results.length > 0) {
          // Comparamos la contraseña proporcionada con el hash almacenado usando bcrypt
          const isMatch = await bcrypt.compare(providedPassword, results[0].password);
          resolve(isMatch); // Devolvemos true si las contraseñas coinciden, false en caso contrario
        } else {
          resolve(false); // No se encontró el usuario
        }
      });
    });
  };

module.exports = { checkCredentials };