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
router.delete("/:id", async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      res.json({ msg: `Invalid Comment ID: ${req.params.id}` });
      return;
    }
    if (req.params.id < 0) {
      res.json({ msg: `Invalid Comment ID: ${req.params.id}` });
    } else {
      const comment = await commentsdb.one(parseInt(req.params.id));
      if (comment) {
        const deletedComment = await commentsdb.delete(parseInt(req.params.id));
        res.json({ msg: "Successfully Deleted Comment" });
      } else {
        res.json({
          msg: `Comment with the ID: ${req.params.id} does not exist.`
        });
      }
    }
  } catch (e) {
    res.json(e);
  }
});

router.put("/:id", async (req, res) => {
  if (isNaN(req.params.id) || req.params.id <= 0) {
    res.json({ msg: `Invalid Comment id: ${req.params.id}` });
    return;
  }
  const commentExist = await commentsdb.one(parseInt(req.params.id));
  if (commentExist) {
    const { username, comment } = req.body;
    if (username == "" || comment == "") {
      res.json({ msg: "Invalid Input Fields" });
      return;
    } else {
      const com = {
        username: username,
        comment: comment
      };

      const updateComment = await commentsdb.update(
        com,
        parseInt(req.params.id)
      );
      res.json({ msg: "Comment successfully updated" });
    }
  } else {
    res.json({ msg: `Comment with the ID: ${req.params.id} does not exits` });
  }
});

module.exports = router;
