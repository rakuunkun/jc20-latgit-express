const express = require("express");
// const { verifyTokenAccess, verifyTokenEmail } = require("../lib/verifyToken");
const Router = express.Router();
const { authControllers } = require("./../controllers");
const { login } = authControllers;

Router.post("/login", login);
module.exports = Router;
