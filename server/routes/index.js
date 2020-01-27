const express = require("express");
const commentsdb = require("../db");
const router = express.Router();

//gets all the comments from the database
router.get("/", async (req, res, next) => {
  try {
    let result = await commentsdb.all();
    res.json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//gets a single comment from the database
router.get("/:id", async (req, res, next) => {
  try {
    let result = await commentsdb.one(req.params.id);
    res.json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//Route to add a comment to the database
router.post("/", async (req, res) => {
  try {
    if (!req.body) {
      res.send("Error Submitting data");
      return;
    }
    const { username, comment } = req.body;
    if (username == "" || comment == "") {
      res.status(502).json({ err: "All Fields are required" });
      return;
    }
    const com = {
      username: username,
      comment: comment
    };
    const result = await commentsdb.add(com);
    res.send(`Comment Inserted Successfully, CommentID: ${result.insertId}`);
  } catch (e) {
    res.send(e);
  }
});

//ROute for deleting a comment from the database
router.delete("/:id", (req, res) => {
  console.log(req.params.id);
});

module.exports = router;
