const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");
const { render } = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// template engine
app.set("view engine", "ejs");
app.set("views", "views");

const getTotalUsers = () => {
  return db.query("SELECT COUNT(*) AS total FROM ??", ["users"]);
};

app.get("/", (req, res) => {
  getTotalUsers()
    .then((results) => {
      const totalUsers = results[0][0].total;

      res.render("home", {
        pageTitle: "Home page",
        count: totalUsers,
        status: "",
      });
    })
    .catch((err) => console.log(err));
});

app.post("/register", (req, res) => {
  const email = req.body.email;

  db.execute("INSERT INTO users(email) VALUES (?) ", [email])
    .then(
      getTotalUsers().then((results) => {
        res.render("home", {
          count: results[0][0].total,
          status: "sucessfully"
        });
      })
    )

    .catch((err) => console.log(err));
});

// 404 route
app.use((req, res) => {
  res.status(404).render("404.ejs", {
    pageTitle: "Page not found",
  });
});

// server start
app.listen(3000, () => {
  console.log("running on port 3000");
});
