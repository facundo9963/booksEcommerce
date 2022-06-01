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

const updateStock = async (req, res, next) => {
  const { id, stock } = req.body;
  console.log(stock)
  if (!id || typeof stock == "undefined") {
    return next({ status: 400, message: "All fields are required" });
  }
  try {
    const updateProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        stock,
      },
    });
    res.status(200).json(updateProduct)
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

const getProducts = async (req, res, next) => {
  
    try {
      const allProducts = await prisma.product.findMany({
          include: {
        detail: true, // Return all fields
      }});
      res.status(200).json(allProducts)
    } catch (err) {
      console.log(err);
      next();
    }
  };

module.exports = {
  addProduct,
  updateStock,
  getProducts
};
