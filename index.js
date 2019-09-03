const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");
const noteRoute = require("./routes/note");

mongoose.connect(
  `mongodb+srv://yahub:${process.env.MONGODB_PW}@notescluster-5djym.gcp.mongodb.net/test?retryWrites=true&w=majority`,
  { useCreateIndex: true, useNewUrlParser: true },
  () => console.log("Connected to MongoDB!")
);

const app = express();
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
app.get("/", (req, res) => res.send("api running"));
app.use("/api", authRoute);
app.use("/api/notes", noteRoute);

app.listen(process.env.PORT || 5000, () =>
  console.log("server is up on port 5000!")
);
