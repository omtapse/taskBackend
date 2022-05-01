const express = require("express");
const cors = require("cors");

const mongoDB = require("mongodb");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { userSchema } = require("./modals/UserScema");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get("/users", async (req, res, next) => {
  userSchema.find({}).then((users) => {
    console.log(users);
    res.send(users);
  });
});

app.post("/adduser", (req, res, next) => {
  const firstName = req.body.Newuser.firstName;
  const lastName = req.body.Newuser.lastName;
  const mobileNo = req.body.Newuser.mobileNo;
  const email = req.body.Newuser.email;
  const id = req.body.Newuser.id;
  console.log(req.body.Newuser);
  try {
    const newUser = new userSchema({
      firstName: firstName,
      lastName: lastName,
      mobileNo: mobileNo,
      email: email,
      id: id,
    });
    console.log(newUser);
    newUser.save();
    res.status(200).send({ message: "User Suceessfully registered" });
  } catch (error) {
    console.log(error);
    res.status(401);
  }
});

app.post("/deleteUser", async (req, res, next) => {
  const id = req.body.id;
  console.log(req.body.id);
  const filter = { id: id };
  try {
    await userSchema.findOneAndDelete(filter);
    res.status(200).send({ message: "User Deleted registered" });
  } catch (error) {
    console.log(error);
    res.status(401);
  }
});

app.post("/editUser", async (req, res, next) => {
  const firstName = req.body.EditUser.firstName;
  const lastName = req.body.EditUser.lastName;
  const mobileNo = req.body.EditUser.mobileNo;
  const email = req.body.EditUser.email;
  const id = req.body.EditUser.id;
  const update = {
    firstName: firstName,
    lastName: lastName,
    mobileNo: mobileNo,
    email: email,
  };
  const filter = { id: id };
  try {
    let userTOEdit = await userSchema.findOneAndUpdate(filter, update);
    res.status(200).send({ message: "User Updated Succesfully" });
  } catch (error) {
    console.log(error);
    res.status(401);
  }
});

mongoose
  .connect(
    "mongodb+srv://omtapse:2yqNmkSlN8VegaV8@cluster0.axdsl.mongodb.net/Tesk?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("connected");
    const server = app.listen(process.env.port || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
