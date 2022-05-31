require("dotenv").config();
const jwt = require("jsonwebtoken");
const { hashSync, compareSync } = require("bcrypt")
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
    //hasheamos la contraseña
    const hashPassword = hashSync(password, 10);

    // Creamos el nuevo usuario y lo guardamos en la DB
    user = await prisma.user.create({
      data: {
        name,
        email,
        password:hashPassword,
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

const login = async (req, res, next) => {
    // Si no hay errores, continúo
    const { email, password } = req.body
    console.log(email, password)
  
    if (!email || !password) {
      return next({
        status: 400,
        message: "All fields are required",
      })
    }
  
    try {
      let user = await prisma.user.findUnique({ where: { email } })
  
      // ningún usuario contiene ese correo
      if (!user) return next({ status: 400, message: "Invalid credentials" })
  
      console.log(user.password)
      // Teniedo el usuario, determinamos si la contraseña enviada es correcta
      const isMatch = compareSync(password, user.password)
      console.log(compareSync(password, user.password))
  
      // si la contraseña es incorreta
      if (!isMatch) return next({ status: 400, message: "Invalid credentials" })
  
      // si la contraseña y email son validos escribimos el payload/body
      const payload = {
        user: { id: user.id },
      }
  
      // GENERO EL TOKEN
      jwt.sign(
        payload,
        JWT_SECRET,
        {
          expiresIn: "3d",
        },
        (err, token) => {
          if (err) throw err
          return res.json({ token })
        },
      )
    } catch (err) {
      // console.log(err)
      next(err)
    }
  }

module.exports = {
  createUser,
  login
};
