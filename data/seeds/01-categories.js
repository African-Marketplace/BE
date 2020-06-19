exports.seed = function(knex) {
  return knex("categories").insert([
    { category_name: "Animal Products" },
    { category_name: "Beans" },
    { category_name: "Cereals" },
    { category_name: "Fruits" },
    { category_name: "Vegetables" }
  ]);
};
