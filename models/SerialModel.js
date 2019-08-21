const { db1, db2 } = require("../config/db");

const SerialModel = {
  getSerialByEventId: async event_id => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        `select a.id,a.event_id, a.title, a.qty, a.status,b.redeemed
        from serial_main a left join 
        (select  event_sub_id, sum(case when status=1 then 1 else 0 end) as 'redeemed'
        from event_serial
        where event_id=?
        group by event_sub_id 
        ) b on a.id = b.event_sub_id
        where a.event_id=?
        `,
        [event_id, event_id]
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return [];
        }
      })
      .catch(err => ({ error: err.message }));
  },
  getRedeemHistoryByEventId: async event_id => {
    return await db2
      .promise()
      .query(
        `select b.partner_uid,b.char_id, b.char_name,b.ip, b.serial, b.create_time , a.event_sub_id, sm.title, b.status
      from log_serial_event b left join  event_serial a
      on b.serial = a.serial 
      left join serial_main sm on sm.id=a.event_sub_id
      where b.event_id=? 
      `,
        [event_id]
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return [];
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findOne: async game_id => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query("select * from games where game_id=?", [game_id])
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  },
  save: async game => {
    return await db1
      .promise()
      .query("insert into games set ?", game)
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "新增失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findByIdAndUpdate: async (game_id, game) => {
    return await db1
      .promise()
      .query("Update games set ? where id=?", [game, game_id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "更新失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  }
};

module.exports = SerialModel;
