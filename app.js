const http = require("http");
const express = require("express");
const path = require("path");
const db = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

db.execute("SELECT * FROM products")
    .then(result =>{
        console.log(result[0]);
    })
    .catch(err =>{
        console.log(err);
    })

const errorController = require("./controllers/404");

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);