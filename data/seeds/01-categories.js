exports.seed = function(knex) {
  return knex("categories").insert([
    { category_name: "Clothing & Apparel" },
    { category_name: "Authentic Artwork" },
    { category_name: "Accessories" },
    { category_name: "Food Items" },
    { category_name: "Others" }
  ]);
};
