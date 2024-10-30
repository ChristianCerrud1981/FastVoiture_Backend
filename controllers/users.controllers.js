//Internal imports
const User = require("../models/User");
const authUtils = require("../utils/auth.utils");

exports.getAllUsers = async (req, res) => {
  try {
    // Verificar la autenticación
    const isTokenValid = authUtils.protect(req);
    if (isTokenValid === false) {
      return res.status(401)
        .send(`401 Unauthorized : Si l'ulisateur n'est pas authentifié ou si le token est
        invalide`);
    }
    // Obtener la lista de usuarios registrados
    const user = await User.find().select(
      "nom prenom telephone email password role"
    );
    return res.send(user);
  } catch (error) {
    return res.status(500).send(`Une erreur s'est produite` + error);
  }
};
