const express=require("express")

const controllers=require("../../controllers/admin/product.controller")
const validate=require("../../validates/admin/product.validate")
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
route.post("/create",upload.single("thumbnail"),validate.createPost,controllers.createPost)
route.get("/edit/:id",controllers.edit)
route.patch("/edit/:id",upload.single("thumbnail"),validate.createPost,controllers.editPatch)
route.get("/detail/:id",controllers.detail)
module.exports=route
