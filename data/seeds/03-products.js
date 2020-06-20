exports.seed = function(knex) {
  return knex("products").insert([
    {
      product_name: "Eggs",
      description: "Organic",
      price: 3.2,
      category_id: 1,
      location_id: 5,
      seller_id: 1
    },
    {
      product_name: "White Rice",
      description: "Imported",
      price: 5.5,
      category_id: 3,
      location_id: 4,
      seller_id: 2
    },
    {
      product_name: "Onions",
      description: "Dry",
      price: 2.7,
      category_id: 5,
      location_id: 2,
      seller_id: 1
    },
    {
      product_name: "Soya Beans",
      description: "Packet",
      price: 4.5,
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
