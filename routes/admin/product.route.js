const express=require("express")

const controllers=require("../../controllers/admin/product.controller")

const multer = require("multer");
const route=express.Router()


const storageMulterHelper = require("../../helpers/storageMulter");
const storage = storageMulterHelper();
const upload = multer({ storage: storage });
route.get("/",controllers.index)
route.patch("/change-status/:status/:id", controllers.changeStatus)
route.patch("/change-multi",controllers.changeMulti)
route.delete("/delete/:id",controllers.delete)
route.get("/create",controllers.create)
route.post("/create",upload.single("thumbnail"),controllers.createPost)
module.exports=route
