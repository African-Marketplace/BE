const express = require("express");
const Helpers = require("./products-model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Helpers.getCategories();
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not retrieve categories" });
  }
});

router.get("/:categoryID", async (req, res) => {
  const { categoryID } = req.params;

  try {
    const products = await Helpers.getProducts(categoryID);
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not retrieve products of specified category ID"
    });
  }
});

router.post("/:categoryID/new", async (req, res) => {
  const { categoryID } = req.params;
  const { body } = req;

  try {
    const location = await Helpers.findLocation(body.location);

    const newProduct = await Helpers.addProduct({
      product_name: body.product_name,
      description: body.description,
      price: body.price,
      category_id: categoryID,
      location_id: location.id,
      seller_id: req.decodedJwt.subject
    });

    res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not add new product" });
  }
});

module.exports = router;
