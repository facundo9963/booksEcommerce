
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const  prisma  = require("../client");

module.exports = async (req, res, next) => {
  // el token viene en el header de la petición, lo tomamos:
  const token = req.header("Authorization");

  // Si no nos han proporcionado un token lanzamos un error
  if (!token) {
    return next({ status: 403, message: "Token not found" });
  }

  if (typeof token !== "undefined") {
    try {
      //const tokenValidate = token.split(" ")[1];

      //req.token = tokenValidate;
      //console.log(tokenValidate)
      //console.log(JWT_SECRET)
      //const decoded =  jwt.verify(tokenValidate, JWT_SECRET );
      //console.log(decoded)
    

      let user = await prisma.user.findUnique({
        where: {
          id: 11,
        },
      })

      // ningún usuario contiene ese correo
      if (!user) return next({ status: 400, message: "Invalid credentials" });

      req.user = user;

      next();
    } catch (error) {
      res.sendStatus(406);
    }
  } else {
    res.sendStatus(403);
  }
};
