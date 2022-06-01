const prisma = require("../client");

const addProduct = async (req, res, next) => {
  const { productId } = req.body;

  if (!productId) {
    return next({ status: 400, message: "All fields are required" });
  }
  try {
    await prisma.productsOnCarts.create({
      data: {
        cartId: req.user.id,
        productId: productId,
      },
    });
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

module.exports = {
  addProduct,
  getProducts,
};
