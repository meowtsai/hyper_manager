const { db1, db2 } = require("../config/db");

const GamesModel = {
  getAll: async () => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        "select game_id,name as game_name,logo_path,is_active from games order by game_id desc"
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return null;
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

module.exports = GamesModel;
