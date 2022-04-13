const express = require("express");
const { verifyTokenAccess, verifyTokenEmail } = require("../lib/verifyToken");
const Router = express.Router();
const { authControllers } = require("./../controllers");
const { login, deactiveUser } = authControllers;

const validateAdmin = (req, res, next) => {
  if (req.user.roles_id === 1) {
    // admin roles_idnya 1
    next();
  } else {
    return res.status(401).send({ message: "user unauthorized" });
  }
};

Router.post("/login", login);
Router.patch("/deactivate", verifyTokenAccess, validateAdmin, deactiveUser);
module.exports = Router;
