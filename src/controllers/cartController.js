const prisma = require("../client");

const addProduct = async (req, res, next) => {
  const { productId } = req.body;

  if (!productId) {
    return next({ status: 400, message: "All fields are required" });
  }
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (product.stock > 0) {
      await prisma.productsOnCarts.create({
        data: {
          cartId: req.user.id,
          productId: productId,
        },
      });
    }
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    next({});
  }
};

const getProducts = async (req, res, next) => {
  try {
    const allProducts = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        cart: {
          include: {
            product: {
              include: { detail: true },
            },
          },
        },
      },
    });

    res.status(200).json(allProducts.cart);
  } catch (err) {
    console.log(err);
    next({});
  }
};

const buyCart = async (req, res, next) => {
  try {
    const allProducts = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        cart: {
          include: {
            product: {
              include: { detail: true },
            },
          },
        },
      },
    });
    console.log(allProducts);

    allProducts.cart.map(async (product) => {
      if (product.product.stock > 0) {
        return await prisma.product.update({
          where: {
            id: product.productId,
          },
          data: {
            stock: {
              decrement: 1,
            },
          },
        });
      }
    });
    await prisma.productsOnCarts.deleteMany({});
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
};

module.exports = {
  addProduct,
  getProducts,
  buyCart,
};
