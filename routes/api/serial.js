const express = require("express");
const router = express.Router();
const SerialModel = require("../../models/SerialModel");
const moment = require("moment");
const auth = require("../../middleware/auth");

//@route: GET /api/serial/list
//@desc: get serial list
//@access: private

router.get("/m/:event_id", auth, async (req, res) => {
  const event_id = req.params.event_id;
  if (event_id) {
    const serial_list = await SerialModel.getSerialByEventId(event_id);
    res.json(serial_list);
  } else {
    res.statusCode(401).json({ msg: "Must provide an event id." });
  }
});

//getSerialLogs
router.get("/h/:event_id", auth, async (req, res) => {
  const event_id = req.params.event_id;
  if (event_id) {
    const redeemHistory = await SerialModel.getRedeemHistoryByEventId(event_id);
    res.json(redeemHistory);
  } else {
    res.statusCode(401).json({ msg: "Must provide an event id." });
  }
});

module.exports = router;
