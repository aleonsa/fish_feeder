const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { checkCredentials,
        getSchedules, 
        updateSchedule,
        addSchedule,
        removeSchedule,
        restoreID
      } = require("./database");

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// --------------   POST for login ----------------------
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const isValid = await checkCredentials(username, password);
  console.log("intento de login", username);

  if (isValid) {
    // Generar el token JWT
    const user = { username }; //
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    // Enviar el token al cliente
    res.json({ accessToken });
  } else {
    res.status(401).send();
  }
});
// --------------- GET for schedules -------------------
app.get("/api/schedules", async (req, res) => {
  try {
    console.log("intento de obtener horarios");
    const schedules = await getSchedules(); // Utiliza la función getSchedules de database.js
    res.json({ schedules : schedules });
  } catch (error) {
    console.error("Error al obtener los horarios", error);
    res.status(500).send();
  }
});
// --------------- POST for update schedules -------------------
// Ruta para actualizar un horario
app.post('/api/schedules/update', async (req, res) => {
  const { id, schedule } = req.body;
  console.log(id, schedule);
  try {
    await updateSchedule(id, schedule); // Implementar esta función en database.js
    res.json({ success: true, message: 'Schedule updated successfully' });
  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).json({ success: false, message: 'Error updating schedule' });
  }
});
// --------------- POST for add schedule -------------------
app.post('/api/schedules/add', async (req, res) => {
  console.log("intento de agregar horario...");
  const { time } = req.body;
  try {
    const newSchedule = await addSchedule(time);
    res.json({ success: true, message: 'Schedule added successfully', time: newSchedule });
  } catch (error) {
    console.error('Error adding schedule:', error);
    res.status(500).json({ success: false, message: 'Error adding schedule' });
  }
});

// --------------- DELETE for remove schedule -------------------
app.delete('/api/schedules/delete/:id', async (req, res) => {
  const { id } = req.params;
  console.log("Intento de eliminar horario con ID:", id);
  try {
    const success = await removeSchedule(id);
    if (success) {
      await restoreID();
      res.json({ success: true, message: 'Schedule deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Schedule not found' });
    }
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).json({ success: false, message: 'Error deleting schedule' });
  }
});


// -------------- PORT LISTEN ---------------------
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
