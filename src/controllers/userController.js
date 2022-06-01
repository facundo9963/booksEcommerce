require("dotenv").config();
const jwt = require("jsonwebtoken");
const { hashSync, compareSync } = require("bcrypt");
const { JWT_SECRET } = process.env;
const prisma = require("../client");

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next({ status: 400, message: "All fields are required" });
  }
  try {
    let user = await prisma.user.findFirst({ where: { email } });
    // Si el correo ya está registrado, devuelvo un error
    if (user) {
      return next({ status: 400, message: "User already exists" });
    }
    //hasheamos la contraseña
    const hashPassword = hashSync(password, 10);

    // Creamos el nuevo usuario y lo guardamos en la DB
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    jwt.sign(
      { id: user.id },
      JWT_SECRET,
      {
        expiresIn: "10h",
      },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    next({});
  }
};

const login = async (req, res, next) => {
  // Si no hay errores, continúo
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    return next({
      status: 400,
      message: "All fields are required",
    });
  }

  try {
    let user = await prisma.user.findUnique({ where: { email } });

    // ningún usuario contiene ese correo
    if (!user) return next({ status: 400, message: "Invalid credentials" });

    // Teniedo el usuario, determinamos si la contraseña enviada es correcta
    const isMatch = compareSync(password, user.password);

    // si la contraseña es incorreta
    if (!isMatch) return next({ status: 400, message: "Invalid credentials" });

    // si la contraseña y email son validos escribimos el payload/body

    // GENERO EL TOKEN
    jwt.sign(
      { id: user.id },
      JWT_SECRET,
      {
        expiresIn: "3d",
      },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    // console.log(err)
    next(err);
  }
};

const addProfileData = async (req, res, next) => {
  const { direction, image } = req.body;

  const newInfo = {};

  if (direction) newInfo.direction = direction;
  if (image) newInfo.image = image;
  console.log(req.user);

  try {
    const userUpdated = await prisma.user.update({
      where: { id: req.user.id },
      data: newInfo,
    });

    delete userUpdated.password;

    res.status(200).json({ message: "user updated", userUpdated });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  login,
  addProfileData,
};
