import express, { Express } from "express";
import { Client } from "pg";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import cookieSession from "cookie-session";

import "./passport-setup";

console.log("secret key", process.env);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  }) as Express
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/auth", (req, res) => {
  res.send("hello world");
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  }),
  (req, res) => {
    console.log("success");
    res.send({});
  }
);

app.get(
  "/auth/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  (req, res) => {
    console.log('success')
    res.redirect("/");
  }
);

app.post("/logout", (req, res) => {
  req.session = null;
  req.logOut();
  res.redirect("/");
});

app.get("/failed", (req, res) => {
  res.send("failed");
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
