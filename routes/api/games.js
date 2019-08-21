const express = require("express");
const router = express.Router();
const GamesModel = require("../../models/GamesModel");
const Admin_user = require("../../models/Admin_user");
const moment = require("moment");
const auth = require("../../middleware/auth");
const checkPermission = require("../../middleware/checkPermission");

//@route: GET /api/games/list
//@desc: get game list
//@access: private

router.get("/list", auth, async (req, res) => {
  const games_list = await GamesModel.getAll();
  res.json(games_list);
});

module.exports = router;
