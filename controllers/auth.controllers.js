//External imports
const jwt = require("jsonwebtoken");

//Internal imports
const User = require("../models/User");

//POST/auth/login
exports.login = async (req, res) => {
  //Recover email and password body
  const email = req.body.email;
  const password = req.body.password;

  //verify email and password aren't empty
  if (email === undefined || email.trim() === "") {
    return res
      .status(400)
      .send(`400 Bad Request: Si des parametres sont manquants ou invalides.`);
  }

  if (password === undefined || password.trim() === "") {
    return res
      .status(400)
      .send(`400 Bad Request: Si des parametres sont manquants ou invalides.`);
  }

  //search user with email of body
  const user = await User.findOne({ email });
  if (user === null) {
    return res
      .status(401)
      .send(
        `401 Unauthorized: Si l'adresse e-mail ou le mot de passe est incorrect.`
      );
  }

  //compare password of user with password of body
  if (user.password !== password) {
    return res
      .status(401)
      .send(
        `401 Unauthorized: Si l'adresse e-mail ou le mot de passe est incorrect.`
      );
  }
  //Generate a token
  const token = jwt.sign({ _id: user._id }, "FastVoiture2024");
  res.status(200).send(token);
};

//POST/auth/register
exports.register = async (req, res) => {
  //Recover user, email and password body
  const { nom, prenom, telephone, email, password, role } = req.body;

  if (nom === undefined || nom.trim() === "") {
    return res
      .status(400)
      .send(`400 Bad Request : Si des paramètres sont manquants ou invalides.`);
  }
  if (prenom === undefined || prenom.trim() === "") {
    return res
      .status(400)
      .send(`400 Bad Request : Si des paramètres sont manquants ou invalides.`);
  }
  if (telephone === undefined || telephone.trim() === "") {
    return res
      .status(400)
      .send(`400 Bad Request : Si des paramètres sont manquants ou invalides.`);
  }
  if (email === undefined || email.trim() === "") {
    return res
      .status(400)
      .send(`400 Bad Request : Si des paramètres sont manquants ou invalides.`);
  }
  if (password === undefined || password.trim() === "") {
    return res
      .status(400)
      .send(`400 Bad Request : Si des paramètres sont manquants ou invalides.`);
  }
  if (role === undefined || role.trim() === "") {
    return res
      .status(400)
      .send(`400 Bad Request : Si des paramètres sont manquants ou invalides.`);
  }

  //Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser !== null) {
    return res
      .status(409)
      .send(
        "409 Conflict : Si l'adresse e-mail est déjà u􀆟lisée par un autre u􀆟lisateur."
      );
  }

  //Create user
  const filter = { email: email };
  const user = await User.findOne(filter);
  try {
    await User.create(req.body);
    const newUser = await User.findOne(filter);
    const token = jwt.sign({ _id: newUser.id }, "FastVoiture2024");
    return res.status(201).send(`Successfully created with token ${token}`);
  } catch (error) {
    return res.send(error.message);
  }
};

exports.update = (req, res) => {
  User.update(req.body);
  return res.send("Successfully Updated");
};
