const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const hash = await bcrypt.hash(password, 9);
  try {
    const user = await prisma.user.create({ data: { email, password: hash } });
    const token = jwt.sign({ email }, process.env.SECRET);
    res.send({
      success: "Le compte a été crée",
      token,
      id: user.id,
      email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {

    console.error(error);
    if (error.code == "P2002")
      res.send({ emailError: "Cette adresse email est déjà utilisé" });
  }
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      throw new Error("L'adresse email ou le mot de passe est incorrect.");

    const isGoodPassword = await bcrypt.compare(password, user.password);
    if (!isGoodPassword)
      throw new Error("L'adresse email ou le mot de passe est incorrect.");

    const token = jwt.sign(
      { email, isAdmin: user.isAdmin },
      process.env.SECRET
    );

    res.send({
      success: "Vous êtes en ligne !",
      token,
      id: user.id,
      email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.send({ error: error.message });
  }
};

exports.setProfilPicture = async (req, res) => {
  const { email, picture } = req.body;
  try {
    await prisma.user.update({
      where: { email },
      data: { profilPicture: picture },
    });
    res.send({ success: "La photo de profil a été mise à jour" });
    
  } catch (error) {
    res.send({ error: error.message });
  }
};
