//->set("server_list", $this->DB2->where("game_id", $this->game_id)->order_by("server_id")->get("servers"))

const { db1, db2 } = require("../config/db");

const ServersModel = {
  getByGameId: async game_id => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        "select server_id,name as server_name, server_status from servers where game_id=? order by server_id desc",
        [game_id]
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return [];
        }
      })
      .catch(err => ({ error: err.message }));
  }
};

module.exports = ServersModel;
