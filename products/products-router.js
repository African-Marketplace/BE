const express = require("express");
const Helpers = require("./products-model");

const router = express.Router();

router.get("/cat", async (req, res) => {
  try {
    const categories = await Helpers.getCategories();
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not get categories" });
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
        message: "No products listed on specified category ID yet"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not get products"
    });
  }
});

router.post("/cat/:categoryID", async (req, res) => {
  const { categoryID } = req.params;
  const { body } = req;

  try {
    const location = await Helpers.findLocation(body.location);

    const newProduct = await Helpers.add({
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
    res.status(500).json({ message: "Could not add product" });
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
    res.status(500).json({ message: "Could not get my products" });
  }
});

router.put("/my/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const { product_name, description, price } = changes;

  try {
    const category = await Helpers.findCategory(changes.category);
    const location = await Helpers.findLocation(changes.location);

    const count = await Helpers.update(
      {
        category_id: category.id,
        location_id: location.id,
        product_name,
        description,
        price
      },
      id
    );

    res.status(200).json({ updatedCount: count });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not update product" });
  }
});

router.delete("/my/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const count = await Helpers.remove(id);

    res.status(200).json({ removedCount: count });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not remove product" });
  }
});

module.exports = router;
