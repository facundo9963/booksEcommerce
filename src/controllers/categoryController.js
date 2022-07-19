
const { user } = require("../client");
const prisma = require("../client");

const addCategory = async (req, res, next) => {
    const { name } =
      req.body;

    if (!name) {
        return next({ status: 400, message: "All fields are required" });
      }
  try {

    let category = await prisma.category.upsert({
      where: {
        name:name
      },
      update:{},
      create:{
        name:name
      }
    });
    console.log(category)
    res.sendStatus(200)
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
    addCategory,
};