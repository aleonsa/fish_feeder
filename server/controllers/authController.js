const jwt = require('jsonwebtoken');

const userAuthenticated = (req, res) => {
  const user = { id: user.id }; // Obtén la información del usuario
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  res.json({ accessToken });
};

module.exports = { userAuthenticated };