const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

const authRouter = require("../auth/auth-router");
const productsRouter = require("../products/products-router");
const restricted = require("../auth/restricted-middleware");

server.use("/api/auth", authRouter);
server.use("/api/products", restricted, productsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "api up and running" });
});

module.exports = server;
