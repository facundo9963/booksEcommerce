require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const prisma = require("../client");

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(JWT_SECRET);
  console.log(name);
  console.log(email);
  console.log(password);

  if (!name || !email || !password) {
    return next({ status: 400, message: "All fields are required" });
  }
  try {
    let user = await prisma.user.findFirst({ where: { email } });
    // Si el correo ya está registrado, devuelvo un error
    if (user) {
      return next({ status: 400, message: "User already exists" });
    }

    // Creamos el nuevo usuario y lo guardamos en la DB
    user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    console.log(user);

    // generamos el payload/body para generar el token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: "2d",
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

module.exports = {
  createUser,
};
