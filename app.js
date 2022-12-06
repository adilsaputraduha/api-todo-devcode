const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const appRoute = require("./src/routers/route-todo");
app.use("/", appRoute);

app.listen(3030, () => {
    console.log("Server Berjalan di Port : 3030");
});
