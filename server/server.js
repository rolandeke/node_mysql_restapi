const express = require("express");
const apiRouter = require("./routes");
const usersRouter = require("./routes/users");
const app = express();

app.use(express.json());

app.use("/api/comments", apiRouter);

app.use("/api/users", usersRouter);

app.listen(process.env.PORT || "5000", () => {
  console.log(`App started on ${process.env.PORT || 5000}`);
});
