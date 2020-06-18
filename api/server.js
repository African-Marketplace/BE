const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

const productsRouter = require("../products/products-router");

server.use("/api/products", productsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "api up and running" });
});

module.exports = server;
