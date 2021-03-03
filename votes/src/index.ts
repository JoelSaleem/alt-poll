import express from "express";

const app = express();

app.use("/votes", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("Listening on port: 3000");
});
