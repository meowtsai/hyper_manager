const { db1, db2 } = require("../config/db");

const ServiceRpt = {
  getCaseCountByDateRange: async (beginDt, endDt, admin_uid) => {
    //console.log(cs_member);
    const conditional_query =
      admin_uid !== "" ? ` and allocate_admin_uid=${admin_uid}` : "";
    //console.log("conditional_query", conditional_query);
    return await db2
      .promise()
      .query(
        `select g.name as game_name, b.game_id, count(*) as cnt ,
        SUM(case when allocate_status='1' then 1 else 0 end) as 'status_process', 
        SUM(case when allocate_status='2' then 1 else 0 end) as 'status_done',
        SUM(case when allocate_admin_uid='113' then 1 else 0 end) as 'status_robot'
        from questions q left join servers b on q.server_id =b.server_id 
        left join games g on b.game_id = g.game_id 
        where allocate_status is not null and allocate_date between ? and ? 
        ${conditional_query}
        group by g.name, b.game_id order by cnt desc;`,
        [beginDt, endDt + " 23:59:59"]
      )
      .then(([rows, fields]) => ({ admin_uid, result: rows }))
      .catch(err => {
        //console.log(err);
        return err;
      });
  },

  getAllocateCount: async (beginDt, endDt, admin_uid) => {
    return await db2
      .promise()
      .query(
        `select  count(*) as cnt ,
        SUM(case when allocate_status='1' then 1 else 0 end) as 'status_process', 
        SUM(case when allocate_status='2' then 1 else 0 end) as 'status_done'
        from questions q left join servers b on q.server_id =b.server_id 
        left join games g on b.game_id = g.game_id 
        where allocate_status is not null and allocate_admin_uid=? and allocate_date between ? and ?`,
        [admin_uid, beginDt, endDt + " 23:59:59"]
      )
      .then(([rows, fields]) => rows[0])
      .catch(err => {
        console.log(err);
        return err;
      });
  },

  getDirectHandleCount: async (beginDt, endDt, admin_uid) => {
    return await db2
      .promise()
      .query(
        `select count(*) as cnt from questions where close_admin_uid=? and update_time between ? and ? and status=4;`,
        [admin_uid, beginDt, endDt + " 23:59:59"]
      )
      .then(([rows, fields]) => rows[0].cnt)
      .catch(err => {
        //console.log(err);
        return err;
      });
  },

  getCplCaseCount: async (beginDt, endDt, admin_uid) => {
    return await db2
      .promise()
      .query(
        `select count(*) as cnt, (select count(*)
        from cpl_replies
        where admin_uid=? and contact_time between ? and ? ) as replies_cnt
        from cpl_cases
        where admin_uid=? and close_date between ? and ? and status=4;`,
        [
          admin_uid,
          beginDt,
          endDt + " 23:59:59",
          admin_uid,
          beginDt,
          endDt + " 23:59:59"
        ]
      )
      .then(([rows, fields]) => rows[0])
      .catch(err => {
        //console.log(err);
        return err;
      });
  },

  getGovLetterCount: async (beginDt, endDt, admin_uid) => {
    //console.log("getGovLetterCount", beginDt, endDt, admin_uid);
    return await db2
      .promise()
      .query(
        `select count(*) as cnt from gov_letters where admin_uid=? and close_date between ? and ? and status=4;`,
        [admin_uid, beginDt, endDt + " 23:59:59"]
      )
      .then(([rows, fields]) => rows[0].cnt)
      .catch(err => {
        //console.log(err);
        return err;
      });
  },

  getCsMembers: async () => {
    return await db2
      .promise()
      .query(`select uid,name from admin_users where role='cs_master'`)
      .then(([rows, fields]) => rows)
      .catch(err => {
        console.log(err);
        return null;
      });
  },

  getSummary: async (beginDt, endDt) => {
    return await db2
      .promise()
      .query(
        `select admin_uid,b.name as admin_name,b.role , sum(cnt) as cnt , sum(status_process) as status_process,sum(status_done) as status_done,sum(gov_cnt) as gov_cnt,sum(cpl_cnt2) as cpl_cnt2 from 
    (select allocate_admin_uid as admin_uid, count(*) as cnt ,
        SUM(case when allocate_status='1' then 1 else 0 end) as 'status_process',
        SUM(case when allocate_status='2' then 1 else 0 end) as 'status_done',
        0 as gov_cnt,
          0 as cpl_cnt2
    from questions q 
    where allocate_status is not null and allocate_date between '${beginDt}' and '${endDt}'
    group by allocate_admin_uid
    union 
    select admin_uid, 0 as cnt, 0 as status_process, 0 as status_done, count(*) as gov_cnt, 0 as cpl_cnt2 from gov_letters where  close_date between '${beginDt}' and '${endDt}' and status=4 group by admin_uid
    union 
    select admin_uid,  0 as cnt, 0 as status_process, 0 as status_done, 0 as gov_cnt ,  count(*) as cpl_cnt2
    from cpl_replies
    where  contact_time between '${beginDt}' and '${endDt}'
    group by admin_uid )  a 
    join admin_users b on a.admin_uid =b.uid
    group by admin_uid  `
      )
      .then(([rows, fields]) => rows)
      .catch(err => {
        console.log(err);
        return null;
      });
  },
  getSummaryYearly: async () => {
    return await db2
      .promise()
      .query(
        `select DATE_FORMAT(allocate_date,'%Y-%m') as month, count(*) total,
        SUM(case when allocate_admin_uid='86' then 1 else 0 end) as 'admin_86',
        SUM(case when allocate_admin_uid='87' then 1 else 0 end) as 'admin_87',
        SUM(case when allocate_admin_uid='116' then 1 else 0 end) as 'admin_116',
        SUM(case when allocate_admin_uid='151' then 1 else 0 end) as 'admin_151'
        from questions q 
        where allocate_status is not null and  allocate_date between CONCAT(YEAR(CURDATE()),'-01-01') AND CONCAT(YEAR(CURDATE()),'-12-31')
        GROUP BY DATE_FORMAT(allocate_date,'%Y-%m');`
      )
      .then(([rows, fields]) => rows)
      .catch(err => {
        console.log(err);
        return null;
      });
  }
};

module.exports = ServiceRpt;
