const { db1, db2 } = require("../config/db");

const PVModel = {
  getAll: async () => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        `select  pv.* ,  g.name as game_name , b.name as server_name from  personal_visits pv
      left join servers b on pv.server_id =b.server_id
      left join games g on pv.game_id = g.game_id
      `
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
  findOne: async id => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query("select * from personal_visits where id=?", [id])
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  },
  save: async pv_record => {
    return await db1
      .promise()
      .query("insert into personal_visits set ?", pv_record)
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "新增失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findByIdAndUpdate: async (id, pv_record) => {
    return await db1
      .promise()
      .query("Update personal_visits set ? where id=?", [pv_record, id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "更新失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },

  findAndRemove: async pv_id => {
    return await db1
      .promise()
      .query("Delete from personal_visits where id=?", [pv_id.id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "刪除失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  }
};

module.exports = PVModel;
