const express = require("express");
const apiRouter = require("./routes");
const usersRouter = require("./routes/users");
const app = express();

app.use(express.json());

app.use("/api/comments", apiRouter);

app.use("/api/users", usersRouter);

const PORT = 3000;

app.listen(PORT, err => {
  console.log(`App started on ${PORT}`);
});
