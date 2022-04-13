const { dbCon } = require("./../connections");
const { createJwtAccess, createJwtemail } = require("../lib/jwt");
const myCache = require("./../lib/cache");
const crypto = require("crypto");

const hashPass = (password) => {
  // puripuriprisoner adalah kunci untuk hashing
  let hashing = crypto
    .createHmac("sha256", "puripuriprisoner")
    .update(password)
    .digest("hex");
  return hashing;
};

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    // init variable
    let conn, sql;
    try {
      conn = await dbCon.promise().getConnection();
      // cari apakah ada username yang sama
      sql = `select * from users where username = ? and password = ? and isActivate = 1`;
      let [userData] = await conn.query(sql, [username, hashPass(password)]);
      console.log(userData);
      if (!userData.length) {
        // username telah terdaftar
        throw { message: "username atau password salah" };
      }
      //   buat datatoken
      let datatoken = {
        id: userData[0].id,
        username: userData[0].username,
        roles_id: userData[0].roles_id,
      };
      //   release connection
      conn.release();
      let token = createJwtAccess(datatoken);
      res.set("x-token-access", token);
      return res.status(200).send(userData[0]);
    } catch (error) {
      //   release connection
      conn.release();
      console.log(error);
      return res.status(500).send({ message: error.message || error });
    }
  },
};
