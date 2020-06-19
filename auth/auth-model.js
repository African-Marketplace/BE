const db = require("../data/db-config");

async function addUser(user) {
  const [id] = await db("users").insert(user, "id");

  return db("users")
    .where({ id })
    .first();
}

function findBy(email) {
  return db("users")
    .where({ email })
    .first();
}

module.exports = {
  addUser,
  findBy
};
