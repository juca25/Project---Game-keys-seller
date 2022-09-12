require("dotenv/config");


require("./db");


const express = require("express");



const hbs = require("hbs");

const app = express();


require("./config")(app);


const capitalized = require("./utils/capitalized");
const projectName = "aame-seller";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;


const index = require("./routes/index.routes");
app.use("/", index);

let userRoutes = require('./routes/user.routes')
app.use("/user", userRoutes);

require("./error-handling")(app);

module.exports = app;
