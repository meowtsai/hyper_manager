const { db1, db2 } = require("../config/db");

const EventsModel = {
  getAll: async () => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query("select * from events order by id desc")
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findOne: async id => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query("select * from events where id=?", [id])
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  },
  save: async event => {
    return await db1
      .promise()
      .query("insert into events set ?", event)
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "新增失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findByIdAndUpdate: async (id, event) => {
    return await db1
      .promise()
      .query("Update events set ? where id=?", [event, id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "更新失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },

  findAndRemove: async event => {
    return await db1
      .promise()
      .query("Delete from events where id=?", [event.id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          //$this->DB1->set("role", "")->where("role", $role)->update("admin_users");
          db1.query("UPDATE events set role='' where role=?", [role]);

          return rows;
        } else {
          return { error: "刪除失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  }
};

module.exports = EventsModel;
