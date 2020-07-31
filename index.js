const express = require("express");
const app = express();
const cors = require("cors");

const UserRouter = require("./routes/User");
const PersonRouter = require("./routes/Person");
const db = require("./models");
require("./config/passport");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", UserRouter);
app.use("/person", PersonRouter);

db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log("server is running on port 8000");
  });
});
