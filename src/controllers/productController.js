require("dotenv").config();
const prisma = require("../client");

const addProduct = async (req, res, next) => {
  const { title, price, stock, categoryId, isbn, author, editorial } = req.body;

  if (!title || !price || !stock || !categoryId) {
    return next({ status: 400, message: "All fields are required" });
  }
  try {
    let product = await prisma.product.create({
      data: {
        title,
        price,
        stock,
        categoryId,
        detail: {
          create: {
            isbn,
            author,
            editorial,
          },
        },
      },
    });
    console.log(product);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    next({});
  }
};

module.exports = {
  addProduct,
};
