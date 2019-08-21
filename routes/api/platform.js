const express = require("express");
const router = express.Router();
const md5 = require("md5");
const validator = require("validator");
const pw_md5_key = require("../../config/default")["pw_md5_key"];
const Admin_user = require("../../models/Admin_user");
const auth = require("../../middleware/auth");

// @route  POST api/platform/modify_password
// @desc   modify passowrd
// @access Private
router.post("/modify_password", auth, async (req, res) => {
  //res.json({ msg: "modify_password works" });

  const errors = validatePassowrdInput(req.body);
  //console.log(error);
  if (!errors.isValid) {
    //Bad request
    return res.status(400).json(errors);
  }

  const { account, password } = req.body;
  let user = await Admin_user.findOne({ account });

  if (!user) {
    return res.status(401).json({ msg: "帳號不存在!" });
  }
  if (req.user.uid !== user.uid) {
    return res.status(401).json({ msg: "只能修改自己的帳號!" });
  }

  const updateResult = await Admin_user.findByUidAndUpdatePassword(user.uid, {
    password: md5(md5(password + pw_md5_key))
  });

  if (updateResult) {
    return res.json({ updateResult });
  } else {
    return res.status(400).json({ msg: "修改失敗!" });
  }
});
module.exports = router;

const validatePassowrdInput = data => {
  let errors = {};
  const { account, password } = data;
  if (!account || validator.isEmpty(account)) {
    errors.account = "沒有帳號。";
  }
  if (
    !password ||
    !validator.isByteLength(password, { min: 6, max: undefined })
  ) {
    errors.password = "密碼長度至少6碼。";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
