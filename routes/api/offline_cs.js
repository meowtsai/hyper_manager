const express = require("express");
const router = express.Router();
const PVModel = require("../../models/PVModel");
//const Admin_user = require("../../models/Admin_user");
const moment = require("moment");
//const auth = require("../../middleware/auth");
const checkPermission = require("../../middleware/checkPermission");
const validator = require("validator");

//@route: GET /api/offline_cs/pv_list
//@desc: get list of personal visit data list
//@access: private
router.get(
  "/pv_list",

  function(req, res, next) {
    return checkPermission(req, res, next, "cpl_case", "read");
  },
  async (req, res) => {
    const pv_list = await PVModel.getAll();

    const return_list = pv_list.map(record => ({
      ...record,
      formated_visit_time: record.visit_time
        ? moment(record.visit_time)
            .local()
            .format("YYYY-MM-DD HH:mm:ss")
        : "",
      formated_status: record.status === "1" ? "1-處理中" : "4-已結案"
    }));

    res.json(return_list);
  }
);

router.get(
  "/pv_list/detail/:record_id",
  function(req, res, next) {
    return checkPermission(req, res, next, "cpl_case", "read");
  },
  async (req, res) => {
    const record_id = req.params.record_id;
    const pv = await PVModel.findOne(record_id);
    if (pv) {
      res.json(pv);
    } else {
      res.status(400).json({ msg: "沒有這個活動" });
    }
  }
);

//@route: POST /api/offline_cs/pv_list
//@desc: add a new pv event
//@access: private
router.post(
  "/pv_list",
  function(req, res, next) {
    return checkPermission(req, res, next, "cpl_case", "modify");
  },
  async (req, res) => {
    const errors = validatePVInput(req.body);

    if (!errors.isValid) {
      //Bad request
      res.status(400).json(errors);
    } else {
      const pv_record = req.body;

      const pv_id = pv_record.id ? pv_record.id : null;
      delete pv_record.id;
      const result = pv_id
        ? await PVModel.findByIdAndUpdate(pv_id, pv_record)
        : await PVModel.save(pv_record);
      //console.log(result);
      if (result.affectedRows === 1) {
        res.json({
          msg: "編輯成功",
          affectedId: pv_id ? pv_id : result.insertId
        });
      } else {
        res.status(500).json({ msg: `新增失敗(${result.error})` });
      }
    }
  }
);

module.exports = router;

const validatePVInput = data => {
  //姓名, 原因, 日期,  處理人
  let errors = {};
  const { client_name, visit_time, cause, admin_uid, client_email } = data;

  if (!client_name || validator.isEmpty(client_name)) {
    errors.clientName = "來訪玩家姓名必須填寫。";
  } else if (
    client_name &&
    !validator.isByteLength(client_name, { min: 2, max: 20 })
  ) {
    errors.clientName = "玩家姓名長度必須在2~20之間。";
  }

  if (client_email && !validator.isEmail(client_email)) {
    errors.email = "Email格式不正確。";
  }

  if (!cause || validator.isEmpty(cause)) {
    errors.cause = "來訪事由必須填寫。";
  } else if (!validator.isByteLength(cause, { min: 2, max: 100 })) {
    errors.cause = "來訪事由長度必須在2~100之間。";
  }

  if (!visit_time) {
    errors.visitTime = "請填寫來訪時間";
  }
  if (!admin_uid) {
    errors.caseMember = "請選擇處理人員";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
