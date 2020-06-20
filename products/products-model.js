const db = require("../data/db-config");

function getCategories() {
  return db("categories");
}

function getProducts(filter) {
  return db("products as p")
    .join("categories as c", "c.id", "p.category_id")
    .join("locations as l", "l.id", "p.location_id")
    .join("users as u", "u.id", "p.seller_id")
    .select(
      "p.id",
      "p.product_name as product",
      "p.description",
      "p.price",
      "c.category_name as category",
      "l.location_name as location",
      "u.name as seller"
    )
    .where(filter);
}

async function addProduct(product) {
  const [id] = await db("products").insert(product, "id");
  return db("products")
    .where({ id })
    .first();
}

function findLocation(location) {
  return db("locations")
    .select("id")
    .where({ location_name: location })
    .first();
}

module.exports = {
  getCategories,
  getProducts,
  addProduct,
  findLocation
};
