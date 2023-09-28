const express=require("express")
require("dotenv").config()
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

var methodOverride = require('method-override')
const bodyParser = require("body-parser");
const app=express()
const systemConfig=require("./config/system")
const port=process.env.PORT
const route=require("./routes/client/index.router")
const database=require("./config/database")
const routeAdmin=require("./routes/admin/index.router")
app.set("views","./views")
app.set("view engine","pug")

app.use(express.static("public"))


// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser("LHNASDASDAD"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash())
route(app)
routeAdmin(app)
database.connect()

app.locals.prefixAdmin=systemConfig.prefixAdmin


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  })