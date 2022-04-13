const { createJwtAccess } = require("../lib/jwt");
const { registerService } = require("../service/authService");
const { dbCon } = require("../connection");

module.exports = {
  // register
  register: async (req, res) => {
    try {
      const {
        success,
        data: userData,
        message,
      } = await registerService(req.body);
      if (!success) {
        throw { message: message };
      }

      const dataToken = {
        id: userData.id,
        username: userData.username,
      };

      const tokenAccess = createJwtAccess(dataToken);

      res.set("x-token-access", tokenAccess);
      return res.status(200).send(userData);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message || error });
    }
  },
};
