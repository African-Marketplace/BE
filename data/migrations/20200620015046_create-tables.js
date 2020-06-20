exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments("id");
      tbl.string("name", 255).notNullable();
      tbl
        .string("email", 255)
        .notNullable()
        .unique();
      tbl.string("password", 255).notNullable();
    })
    .createTable("categories", tbl => {
      tbl.increments("id");
      tbl
        .string("category_name", 255)
        .notNullable()
        .unique();
    })
    .createTable("locations", tbl => {
      tbl.increments("id");
      tbl
        .string("location_name", 255)
        .notNullable()
        .unique();
    })
    .createTable("products", tbl => {
      tbl.increments("id");
      tbl.string("product_name", 255).notNullable();
      tbl.string("description", 255).notNullable();
      tbl
        .float("price")
        .unsigned()
        .notNullable();
      tbl
        .integer("category_id")
        .unsigned()
        .notNullable()
        .references("categories.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("location_id")
        .unsigned()
        .notNullable()
        .references("locations.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("seller_id")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      tbl.unique([
        "product_name",
        "description",
        "price",
        "location_id",
        "seller_id"
      ]);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("products")
    .dropTableIfExists("locations")
    .dropTableIfExists("categories")
    .dropTableIfExists("users");
};
