exports.seed = function(knex) {
  return knex("products").insert([
    {
      product_name: "Djellaba",
      description: "African Outer Robe",
      price: 32,
      category_id: 1,
      location_id: 5,
      seller_id: 1
    },
    {
      product_name: "Earrings",
      description: "Large Hoops",
      price: 23,
      category_id: 3,
      location_id: 4,
      seller_id: 2
    },
    {
      product_name: "African Ostrich Egg",
      description: "Decoratives",
      price: 55,
      category_id: 5,
      location_id: 2,
      seller_id: 1
    },
    {
      product_name: "Nelson Mandela Portrait",
      description: "Portraint Painting",
      price: 100,
      category_id: 2,
      location_id: 1,
      seller_id: 1
    },
    {
      product_name: "Bananas",
      description: "Ripe",
      price: 1.2,
      category_id: 4,
      location_id: 3,
      seller_id: 2
    }
  ]);
};
