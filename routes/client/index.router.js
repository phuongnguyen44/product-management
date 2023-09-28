const homeRoutes = require("./home.router")
const productRoutes =require("./product.router")


module.exports=(app) =>{
    app.use("/",homeRoutes)
    app.use("/products",productRoutes)
}