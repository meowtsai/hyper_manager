const express = require("express");
const router = express.Router();
const serviceRpt = require("../../models/ServiceRptModel");
const Admin_user = require("../../models/Admin_user");
const moment = require("moment");
const auth = require("../../middleware/auth");

//@route: GET /api/service_rpt/home
//@desc: get overview of op report
//@access: public
router.get("/stat", auth, async (req, res) => {
  let stat;

  //console.log(req.user);

  const user = await Admin_user.findByUid(req.user);

  const admin_uid = user.uid;
  const role = user.role;
  // console.log("role", role);
  // console.log("begin_date", req.query.begin_date);
  const begin_date = req.query.begin_date
    ? moment(new Date(req.query.begin_date))
        .local()
        .format("YYYY-MM-DD")
    : moment()
        .subtract(7, "days")
        .format("YYYY-MM-DD");
  const end_date = req.query.end_date
    ? moment(new Date(req.query.end_date))
        .local()
        .format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");
  // console.log("begin_date", begin_date);
  // console.log("end_date", end_date);

  switch (role) {
    case "admin":
    case "pm":
      const cs_members = await serviceRpt.getCsMembers();
      const p_allocateSummary = serviceRpt.getCaseCountByDateRange(
        begin_date,
        end_date,
        ""
      );

      const pArray = cs_members.map(cs_member =>
        serviceRpt.getCaseCountByDateRange(begin_date, end_date, cs_member.uid)
      );

      // Promise.all(pArray).then(allocateCountByMember =>
      //   console.log("allocateCountByMember", allocateCountByMember)
      // );

      const p_csSummary = serviceRpt.getSummary(
        begin_date,
        end_date + " 23:59:59"
      );

      const p_csSummaryByYear = serviceRpt.getSummaryYearly();

      Promise.all([
        p_allocateSummary,
        p_csSummary,
        p_csSummaryByYear,
        ...pArray
      ]).then(
        ([
          allocateCount,
          csSummary,
          csSummaryByYear,
          ...allocateCountByMember
        ]) => {
          res.json({
            forAdmin: true,
            summary: {
              csSummary,
              csSummaryByYear,
              allocateCount,
              cs_members,
              allocateCountByMember
            }
          });
        }
      );

      break;

    default:
      const p1 = serviceRpt.getCaseCountByDateRange(
        begin_date,
        end_date,
        admin_uid
      );
      const p2 = serviceRpt.getCplCaseCount(begin_date, end_date, admin_uid);
      const p3 = serviceRpt.getGovLetterCount(begin_date, end_date, admin_uid);

      Promise.all([p1, p2, p3]).then(
        ([allocateCount, cplCount, govCount]) => {
          stat = {
            allocateCount,
            govCount,
            cplCount
          };

          res.json(stat);
        },
        reason => {
          console.log(reason);
          res.json({ reason });
        }
      );
      break;
  }
});

//@route: GET /api/service_rpt/home
//@desc: get overview of op report
//@access: public
router.get("/home", auth, async (req, res) => {
  //set default date range if not requested
  const begin_date = req.query.begin_date
    ? req.query.begin_date
    : moment()
        .subtract(7, "days")
        .format("YYYY-MM-DD");
  const end_date = req.query.end_date
    ? req.query.end_date
    : moment().format("YYYY-MM-DD");

  //const cs_member = req.query.cs !== "" ? req.query.cs : "";
  //console.log("begin_date", begin_date);
  //console.log("end_date", end_date);

  const cs_members = await serviceRpt.getCsMembers();

  const p1 = serviceRpt.getCaseCountByDateRange(begin_date, end_date, "");

  const pArray = cs_members.map(cs_member =>
    serviceRpt.getCaseCountByDateRange(begin_date, end_date, cs_member)
  );
  // var p2 =

  // var p3 = serviceRpt.getCaseCountByDateRange(begin_date, end_date, "87");

  Promise.all([p1, ...pArray]).then(
    summary => {
      //console.log(values);
      res.json({ summary });
    },
    reason => {
      console.log(reason);
      res.json({ reason });
    }
  );

  // const summary = await serviceRpt.getCaseCountByDateRange(
  //   begin_date,
  //   end_date,
  //   cs_member
  // );

  //res.json({ summary });
});

router.get("/cs_members", auth, async (req, res) => {
  //set default date range if not requested

  const cs_members = await serviceRpt.getCsMembers();

  res.json(cs_members);
});

module.exports = router;
