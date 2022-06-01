require("dotenv").config();
const prisma = require("../client");

const addPurchase = async (req, res, next) => {
    const { productId, stock, distributor } = req.body;

    if (!productId || !stock || !distributor) {
      return next({ status: 400, message: "All fields are required" });
    }
    try {
        await prisma.purchase.create({
            data:{
                distributor,
                amount:stock,
                productId
            }
        })
      const updateProduct = await prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          stock: {
            increment: stock,
          },
        },
      })
      res.status(200).json(updateProduct)
    } catch (err) {
      console.log(err);
      res.status(404).json(err);
    }
  };

module.exports = {
    addPurchase,
  };