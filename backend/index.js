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
mongoose.connect("mongodb+srv://sujatha:sujatha777@cluster0.6palr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(()=> console.log("connected to database"))
  .catch(()=> console.log("Not connected to db"));

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
