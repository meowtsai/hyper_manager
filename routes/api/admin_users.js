const express = require("express");
const router = express.Router();
const Admin_user = require("../../models/Admin_user");

const auth = require("../../middleware/auth");

//@route: GET /api/admin_users/getCSMaster
//@desc: get game list
//@access: private

router.get("/getCSMaster", auth, async (req, res) => {
  const cs_master_list = await Admin_user.findAllByRole("cs_master");
  res.json(cs_master_list);
});

module.exports = router;
