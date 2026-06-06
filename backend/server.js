const express = require("express");
const cors = require("cors")
const app = express();

const { connectDB } = require("./db/connect");
const studentRoutes = require("./routes/studentroutes");
app.use(express.json());
app.use(cors());

app.use("/api", studentRoutes);

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});