exports.seed = function(knex) {
  return knex("locations").insert([
    { location_name: "Bungoma" },
    { location_name: "Eldoret" },
    { location_name: "Garisa" },
    { location_name: "Isiolo" },
    { location_name: "Nairobi" }
  ]);
};
