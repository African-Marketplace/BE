const db = require("../data/db-config");

// GET functions
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
      "p.product_name",
      "p.description",
      "p.price",
      "c.category_name as category",
      "l.location_name as location",
      "u.name as seller"
    )
    .where(filter);
}

// POST functions
async function add(product) {
  const [id] = await db("products").insert(product, "id");
  return db("products")
    .where({ id })
    .first();
}

// PUT functions
function update(changes, id) {
  return db("products")
    .update(changes)
    .where({ id });
}

// DELETE functions
function remove(id) {
  return db("products")
    .where({ id })
    .del();
}

// miscellaneous functions
function findLocation(location) {
  return db("locations")
    .select("id")
    .where({ location_name: location })
    .first();
}

function findCategory(category_name) {
  return db("categories")
    .where({ category_name })
    .first();
}

module.exports = {
  getCategories,
  getProducts,
  add,
  update,
  remove,
  findLocation,
  findCategory
};
