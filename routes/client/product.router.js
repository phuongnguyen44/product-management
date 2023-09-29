const express =require("express")
const controller =require("../../controllers/client/product.controller")
const route =express.Router()

route.get("/",controller.index)
route.get("/detail/:slug",controller.detail)

module.exports=route