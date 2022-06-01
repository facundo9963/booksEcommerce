const prisma = require("../client");

const addProduct = async (req, res, next) => {

    const {productId, userId}= req.body

    if (!productId || !userId ) {
        return next({ status: 400, message: "All fields are required" });
      }
      try {
        
        await prisma.productsOnCarts.create({
            data:{
                cartId:userId,
                productId:productId,
            }
      })
        res.sendStatus(200);
      } catch (err) {
        console.log(err);
        next({});
      }


}




module.exports = {
    addProduct,
};