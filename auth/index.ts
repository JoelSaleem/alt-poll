import express from "express";
import { Client } from "pg";

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("listenning on port 3000");
});

const client = new Client({
  user: "postgres",
  password: "foobar",
  host: "alt-poll-auth.default.svc.cluster.local",
  port: 5432,
  database: "auth",
});

client
  .connect()
  .then(() => {
    console.log("connected");

    return client.query('SELECT * FROM "Users" WHERE name = $1', ["Joel"]);
  })
  .then((results) => console.table(results.rows))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    client.end();
  });
