const express = require("express");
const router = express.Router();
const EventsModel = require("../../models/EventsModel");
//const Admin_user = require("../../models/Admin_user");
const moment = require("moment");
//const auth = require("../../middleware/auth");
const checkPermission = require("../../middleware/checkPermission");
const validator = require("validator");
//@route: GET /api/events/list
//@desc: get overview of op report
//@access: public

router.get(
  "/list",

  function(req, res, next) {
    return checkPermission(req, res, next, "event", "read");
  },
  async (req, res) => {
    const events_list = await EventsModel.getAll();
    const return_list = events_list.map(event => ({
      ...event,
      formated_begin_time: event.begin_time
        ? moment(event.begin_time)
            .local()
            .format("YYYY-MM-DD HH:mm:ss")
        : "",
      formated_end_time: event.end_time
        ? moment(event.end_time)
            .local()
            .format("YYYY-MM-DD HH:mm:ss")
        : "",
      formated_status: event.status === 0 ? "關閉" : "開啟",
      formated_type: event.type === 2 ? "2 - 虛寶" : `其他(${event.type})`
    }));

    res.json(return_list);
  }
);

router.get(
  "/detail/:event_id",
  function(req, res, next) {
    return checkPermission(req, res, next, "event", "read");
  },
  async (req, res) => {
    const event_id = req.params.event_id;
    const event = await EventsModel.findOne(event_id);
    if (event) {
      res.json(event);
    } else {
      res.status(400).json({ msg: "沒有這個活動" });
    }
  }
);

//@route: POST /api/events
//@desc: add a new event or edit an existing event if eventid exist
//@access: private
router.post(
  "/",
  function(req, res, next) {
    return checkPermission(req, res, next, "event", "modify");
  },
  async (req, res) => {
    //console.log(req.body);
    //{"game_id": "MA81", "event_name": "活動一", "type": "1", "status": "1", "begin_time": "2019-08-15T10:14","end_time": "2019-08-22T10:14"}

    //const error = validator.isByteLength(game_id, { min: 5, max: 20 });
    const errors = validateEventInput(req.body);
    //console.log(error);
    if (!errors.isValid) {
      //Bad request
      res.status(400).json(errors);
    } else {
      const event = req.body;
      const event_id = event.id ? event.id : null;
      delete event.id;
      const result = event_id
        ? await EventsModel.findByIdAndUpdate(event_id, event)
        : await EventsModel.save(event);
      console.log(result);
      if (result.affectedRows === 1) {
        res.json({
          msg: "編輯成功",
          affectedId: event_id ? event_id : result.insertId
        });
      } else {
        res.status(500).json({ msg: `新增失敗(${result.error})` });
      }
    }
  }
);

module.exports = router;

const validateEventInput = data => {
  let errors = {};
  const { game_id, event_name, type, status, begin_time, end_time } = data;
  if (!game_id || validator.isEmpty(game_id)) {
    errors.game_id = "遊戲ID必須填寫。";
  }
  if (!event_name || !validator.isByteLength(event_name, { min: 5, max: 40 })) {
    errors.event_name = "活動名稱長度必須在5~20之間。";
  }
  if (!validator.isNumeric(type.toString())) {
    errors.type = "類型是數字";
  }
  if (!validator.isNumeric(status.toString())) {
    errors.status = "活動狀態必是須數字";
  }

  if (!end_time || !validator.isAfter(end_time, begin_time)) {
    errors.end_time = "結束時間必須在開始時間之後";
  }

  if (!begin_time) {
    errors.begin_time = "請填寫開始時間";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
