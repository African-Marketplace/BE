const express = require("express");
const Helpers = require("./products-model");

const router = express.Router();

router.get("/cat", async (req, res) => {
  try {
    const categories = await Helpers.getCategories();
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not retrieve categories" });
  }
});

router.get("/cat/:categoryID", async (req, res) => {
  const { categoryID } = req.params;

  try {
    const products = await Helpers.getProducts({ category_id: categoryID });

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(400).json({
        message: "Specified category ID does not exist or contain any products"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not retrieve products of specified category ID"
    });
  }
});

router.post("/cat/:categoryID", async (req, res) => {
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

router.get("/my", async (req, res) => {
  const { subject } = req.decodedJwt;

  try {
    const products = await Helpers.getProducts({ seller_id: subject });

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(400).json({
        message: "User has not listed any products yet"
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Could not retrieve products of specified user ID" });
  }
});

module.exports = router;
