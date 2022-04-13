const jwt = require("jsonwebtoken");

module.exports = {
  verifyTokenAccess: async (req, res, next) => {
    // dapetin token dari frontend
    //? tanpa express bearer token
    const authHeader = req.headers["authorization"];
    let token;
    // console.log(authHeader); // `Bearer `
    if (authHeader) {
      token = authHeader.split(" ")[1] ? authHeader.split(" ")[1] : authHeader;
      // ini bearer
      // console.log(token);
    } else {
      token = null;
    }
    //? dengan express bearer token
    //   console.log("token", req.token);
    //   const token = req.token;
    let key = process.env.JWT_SECRET;
    try {
      // decode isisnya adalah hasil dekripsi token
      let decode = await jwt.verify(token, key);
      // decode ex: {id:20,username:'user1'}
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send({ message: "user unauthorized" });
    }
  },
  verifyTokenEmail: async (req, res, next) => {
    // dapetin token dari frontend
    //? tanpa express bearer token
    const authHeader = req.headers["authorization"];
    let token;
    // console.log(authHeader); // `Bearer `
    if (authHeader) {
      token = authHeader.split(" ")[1] ? authHeader.split(" ")[1] : authHeader;
      // ini bearer
      // console.log(token);
    } else {
      token = null;
    }
    //? dengan express bearer token
    //   console.log("token", req.token);
    //   const token = req.token;
    let key = process.env.JWT_SECRET;
    try {
      // decode isisnya adalah hasil dekripsi token
      let decode = await jwt.verify(token, key);
      // decode ex: {id:20,username:'user1'}
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send({ message: "user unauthorized" });
    }
  },
};
