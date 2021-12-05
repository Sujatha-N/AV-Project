const config = require("config");

const user = require("./routes/users");
const auth = require("./routes/auth");
const av = require("./routes/av");
const socketRoute = require("./routes/socket");

const express = require("express");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

const mongoose = require("mongoose");



const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/av", av);
app.use("/api/socket", socketRoute);

const httpServer = require("http").createServer(app);

const port = process.env.PORT || config.get("port");
httpServer.listen(port, () => console.log(`Listning to port ${port}.... `));
