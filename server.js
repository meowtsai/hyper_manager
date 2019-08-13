const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/service_rpt", require("./routes/api/service_rpt"));

//serve static assets if in production
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "stage") {
  //set a static folder
  app.use(express.static("client/build"));
  //set a route for anything else not list above
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

var config = require("./config/default");
const port = config.port; // production mode will return 3001
//const port = process.env.PORT || 5000;

let server;
if (app.get("env") !== "production") {
  var http = require("http");

  server = http.createServer(app);
} else {
  var fs = require("fs");
  const https = require("https");
  var options = {
    key: fs.readFileSync(config.ssl_options.keyfile),
    cert: fs.readFileSync(config.ssl_options.certfile),
    ca: [fs.readFileSync(config.ssl_options.cafile)]
  };

  server = https.createServer(options, app);
}

server.listen(port, "0.0.0.0", function() {
  console.log("server env :" + app.get("env"));
  console.log("server is listening on:" + port);
});

//app.listen(port, () => console.log("Sever is listening on port " + port));
