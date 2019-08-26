const express = require("express");
const router = express.Router();
const ServersModel = require("../../models/ServersModel");

const auth = require("../../middleware/auth");

//@route: GET /api/games/list
//@desc: get game list
//@access: private

router.get("/list/:game_id", auth, async (req, res) => {
  const game_id = req.params.game_id;
  const server_list = await ServersModel.getByGameId(game_id);
  res.json(server_list);
});

module.exports = router;
