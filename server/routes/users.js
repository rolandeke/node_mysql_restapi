const express = require("express");
const usersdb = require("../db/users");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let result = await usersdb.all();
    res.json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let result = await usersdb.one(req.params.id);
    res.json(result[0]);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/name/:name", async (req, res, next) => {
  try {
    let result = await usersdb.onebyname(req.params.name);
    res.json(result);
  }catch(e){
      console.log(e)
      res.sendStatus(500)
  }
});
module.exports = router;
