const jwt = require("jsonwebtoken");
const jwtSecret = require("../config/default")["jwtSecret"];
const Admin_user = require("../models/Admin_user");

module.exports = async function(req, res, next, resource, operation) {
  //get token
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "身分驗證失敗, 請登入" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    req.user = decoded.user;

    const user = await Admin_user.findByUid(req.user);

    const role = user.role;

    const is_permitted =
      role === "admin"
        ? true
        : await Admin_user.checkPermission(resource, operation, role);

    if (is_permitted) {
      next();
    } else {
      return res.status(403).json({ msg: "你目前沒有瀏覽這個頁面的相關權限" });
    }
  } catch (err) {
    return res.status(401).json({ msg: "身分驗證失敗, 請登入" });
  }
};
