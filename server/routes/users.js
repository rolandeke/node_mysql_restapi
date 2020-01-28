const express = require("express");
const usersdb = require("../db/users");
const router = express.Router();

//Route for getting all users from the database
router.get("/", async (req, res, next) => {
  try {
    const result = await usersdb.all();
    if (result) {
      res.json(result);
    } else {
      res.json({ msg: "No data to be fetched" });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//Route for getting a single user from the database
router.get("/:id", async (req, res, next) => {
  try {
    if (isNaN(req.params.id) || req.params.id <= 0 || req.params.id == "") {
      res.json({ msg: "Invalid input!!! Try Again" });
      return;
    }
    const result = await usersdb.one(parseInt(req.params.id));
    if (result) {
      res.json(result);
    } else {
      res.json({ msg: `${req.params.id}  cannot be found` });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//Route for getting Users by name
router.get("/:name", async (req, res, next) => {
  try {
    let result = await usersdb.onebyname(req.params.name);
    res.json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//Route for posting a user to the database
router.post("/", async (req, res) => {
  try {
    const { firstname, lastname, age } = req.body;
    if (
      firstname == "" ||
      lastname == "" ||
      isNaN(age) ||
      age == "" ||
      age <= 0
    ) {
      res.json({
        err:
          "Please Check your inputs before submitting. All fields are required"
      });
      return;
    }
    const newUser = {
      firstname: firstname,
      lastname: lastname,
      age: age
    };
    const insertedUser = await usersdb.add(newUser);
    res.json({
      msg: `User has been successfully inserted. UserID: ${insertedUser.insertId}`
    });
  } catch (e) {
    res.json({ msg: e });
  }
});
//Exporting Route
module.exports = router;
