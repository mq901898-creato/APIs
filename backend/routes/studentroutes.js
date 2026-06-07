  const express = require("express");
  const router = express.Router();
  const jwt = require("jsonwebtoken");

  const { client } = require("../db/connect");
  const { ObjectId, Long } = require("mongodb");

  // REGISTER (create user)
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required"
      });
    }
    const users = client.db("practice").collection("students");
  });

  // LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
    console.log("register router hit");
  const users = client.db("practice").collection("students");
  const user = await users.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "User not found"
    });
  }
  if (user.password !== password) {
    return res.status(400).json({
      message: "Invalid password"
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    "secretkey",
    {
      expiresIn: "1h"
    }
  );
  console.log(token);
  res.json({
    message: "Login successful",
    token
  });
});
  // STUDENTS (separate system)
  router.get("/students", async (req, res) => {
    const students = client.db("practice").collection("students");
    const result = await students.find().toArray();
    res.send(result);
  });

  router.put("/students/:id", async (req, res) => {
    const students = client.db("practice").collection("students");
    const result = await students.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    res.send(result);
  });

  router.delete("/students/:id", async (req, res) => {
    const students = client.db("practice").collection("students");

    const result = await students.deleteOne({
      _id: new ObjectId(req.params.id)
    });

    res.send(result);
  });

  module.exports = studentRoutes = router;