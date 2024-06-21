const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { checkCredentials } = require("./database");

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.post("/login", async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
