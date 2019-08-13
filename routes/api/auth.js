const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const md5 = require("md5");
const jwtSecret = require("../../config/default")["jwtSecret"];
const pw_md5_key = require("../../config/default")["pw_md5_key"];

const Admin_user = require("../../models/Admin_user");
const auth = require("../../middleware/auth");
// @route  GET api/auth
// @desc   Logged in user
// @access Private
//const res = await axios.get(`/api/auth?r=${resource}&op=${operation}`);
router.get("/", auth, async (req, res) => {
  try {
    let user = await Admin_user.findByUid({ uid: req.user.uid });
    //console.log("api/auth", req.query, user); //{ r: 'manage_role', op: 'read' }
    // besides login check , ask for addtional resource permission
    if (user.role === "admin") {
      user.is_permitted = true;
    } else {
      user.is_permitted = false;
      if (req.query.r !== "" && req.query.op !== "") {
        const is_permitted = await Admin_user.checkPermission(
          req.query.r,
          req.query.op,
          user.role
        );
        user.is_permitted = is_permitted;
      }
    }
    //console.log("api/auth", req.query, user); //{ r: 'manage_role', op: 'read' }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "伺服器錯誤" });
  }
});

// @route  POST api/auth
// @desc   Auth user & get token
// @access Public
router.post("/", async (req, res) => {
  //const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(422).json({ errors: errors.array() });
  //   }
  const { account, password } = req.body;
  let user = await Admin_user.findOne({ account });

  if (!user) {
    return res.status(401).json({ msg: "沒有這個帳號" });
  }

  const isMatch = md5(md5(password + pw_md5_key)) === user.password;
  if (!isMatch) {
    return res.status(401).json({ msg: "帳密驗證失敗" });
  }

  const payload = {
    user: { uid: user.uid }
  };
  jwt.sign(
    payload,
    jwtSecret,
    {
      expiresIn: "2 days"
    },
    (err, token) => {
      if (err) throw err;
      let responseJson = {
        uid: user.uid,
        account: user.account,
        admin_name: user.name,
        role: user.role,
        token
      };
      res.json(responseJson);
    }
  );
});
module.exports = router;
