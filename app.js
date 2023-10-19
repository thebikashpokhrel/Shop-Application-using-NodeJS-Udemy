const http = require("http");
const express = require("express");
const path = require("path");

const app = express();
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

app.set("view engine", "ejs");
app.set("views", "views");

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/404");

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6530d34aca4a61b4f0b8fefc")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});

// sequelize
//   //.sync({ force: true }) //overwrite the tables
//   .sync()
//   .then((result) => {
//     return User.findByPk(2);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({ name: "Bikash", email: "thebikash@gmail.com" });
//     }
//     return user; //this also returns promise as it is in then block
//   })
//   .then((user) => {
//     console.log(user);
//     return user.createCart();
//   })
//   .then((cart) => {})
//   .catch((err) => console.log(err));
