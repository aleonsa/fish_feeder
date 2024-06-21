const mysql = require("mysql");
const bcrypt = require("bcrypt");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const checkCredentials = (username, providedPassword) => {
  return new Promise((resolve, reject) => {
    // Modificamos la consulta para obtener solo el usuario por username
    const query = "SELECT password FROM Users WHERE username = ?";

    connection.query(query, [username], async (error, results) => {
      if (error) {
        reject(error);
      } else if (results.length > 0) {
        // Comparamos la contraseña proporcionada con el hash almacenado usando bcrypt
        const isMatch = await bcrypt.compare(
          providedPassword,
          results[0].password
        );
        resolve(isMatch); // Devolvemos true si las contraseñas coinciden, false en caso contrario
      } else {
        resolve(false); // No se encontró el usuario
      }
    });
  });
};

const getSchedules = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Schedules";
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const updateSchedule = (scheduleId, newTime) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE Schedules SET time = ? WHERE id = ?";

    connection.query(query, [newTime, scheduleId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.affectedRows > 0) {
          resolve(true);
        } else {
          // No se encontró el horario con el ID proporcionado
          console.log("No schedule found with ID:", scheduleId);
          resolve(false);
        }
      }
    });
  });
};

const addSchedule = (scheduleData) => {
  return new Promise((resolve, reject) => {
    // Asume que `id` es autoincremental y solo inserta `time`
    const query = "INSERT INTO Schedules (time) VALUES (?)";
    const values = [scheduleData];

    connection.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve({ ...scheduleData, id: results.insertId });
      }
    });
  });
};

const removeSchedule = (scheduleId) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM Schedules WHERE id = ?";

    connection.query(query, [scheduleId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.affectedRows > 0) {
          resolve(true); // El horario fue eliminado exitosamente
        } else {
          resolve(false); // No se encontró el horario con el ID proporcionado
        }
      }
    });
  });
};

const restoreID = () => {
  return new Promise((resolve, reject) => {
    const query = "ALTER TABLE Schedules AUTO_INCREMENT = 1;";

    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(true); // El AUTO_INCREMENT fue restablecido exitosamente
      }
    });
  });
};

module.exports =  { checkCredentials, 
                    getSchedules, 
                    updateSchedule,
                    addSchedule,
                    removeSchedule,
                    restoreID
                  };
