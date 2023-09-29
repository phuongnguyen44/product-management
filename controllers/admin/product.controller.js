const Product=require("../../model/product.model")
const filterStatusHelper=require("../../helpers/filterStatus")
const keywordHelper=require("../../helpers/keyword")
const paginationHelper=require("../../helpers/pagination")
const systemConfig=require("../../config/system")

module.exports.index= async (req,res) =>{
    let find={
        deleted:false
    }

    const filterStatus=filterStatusHelper(req.query.status)

    
    if(req.query.status){
        find.status=req.query.status
    }
    const object=keywordHelper(req.query.keyword)
    if(req.query.keyword){
        find.title=object.regex
    }
    let initPagination={
        currentPage:1,
        limitItem:4
    }
    const countProduct = await Product.count(find)
    objectPagination=paginationHelper(initPagination,req.query.page,countProduct)
    const products= await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip).sort({ position: "desc" })
    res.render("admin/pages/products/index.pug",{
        pageTitle:"Danh sach san pham",
        Products:products,
        filterStatus:filterStatus,
        keyword:object.keyword,
        pagination:objectPagination
    })
}

module.exports.changeStatus= async (req,res) =>{
    const status=req.params.status
    const id=req.params.id

    await Product.updateOne({_id :id},{status: status} )
    req.flash("success", `Cập nhật trạng thái thành công sản phẩm!`);
    res.redirect("back")
}

module.exports.changeMulti = async (req,res) =>{
    const type=req.body.type
    const ids=req.body.ids.split(", ")

    switch (type) {
        case "active":
        case "inactive":  
            await Product.updateMany({_id :{$in:ids}},{status: type})  
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`)
            break;
        case "delete-all":
            await Product.updateMany({_id :{$in:ids}},{deleted:true})  
            req.flash("success", `DELETE thành công ${ids.length} sản phẩm!`);
            break;
        case "change-position":
            for (const item of ids) {
                const [id, position] = item.split("-");
                await Product.updateOne({ _id: id }, { position: position });
              }
            req.flash("success", `Thay doi vi tri thành công ${ids.length} sản phẩm!`);  
            break;         
        default:
            break;
    }
    res.redirect("back")
}
module.exports.delete= async(req,res) =>{
    const id=req.params.id

    await Product.updateOne({ _id: id },{deleted: true})
    res.redirect("back")
}

module.exports.create= async (req,res) =>{
    try {
        res.render("admin/pages/products/create.pug",{
            pageTitle:"Tao moi san pham"
           
        })
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products`)
    }
   
}
module.exports.createPost=async (req,res) =>{
    try {
        req.body.price = parseInt(req.body.price)
        req.body.discountPercentage = parseInt(req.body.discountPercentage)
        req.body.stock = parseInt(req.body.stock)
        if(req.body.position===""){
            const countProducts= await Product.countDocuments()
            req.body.position=countProducts+1
        }
        else{
            req.body.position = parseInt(req.body.position);
        }
        if(req.file && req.file.filename) {
            req.body.thumbnail = `/uploads/${req.file.filename}`;
          }
        
        const product =new Product(req.body)
        await product.save()
    
       res.redirect(`/${systemConfig.prefixAdmin}/products`)
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products`)
    }
   
}

module.exports.edit=async(req,res) =>{
    try {
    const id=req.params.id
    const product=await Product.findOne({
        _id:id,
        deleted:false
    })
    res.render("admin/pages/products/edit.pug",{
        pageTitle:"Chinh sua san pham",
        product:product
       
    })
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products`)
    }
    
}

module.exports.editPatch=async(req,res) =>{
    try {
        const id = req.params.id;

        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock);

        req.body.position = parseInt(req.body.position);

        if(req.file && req.file.filename) {
            req.body.thumbnail = `/uploads/${req.file.filename}`;
        }

        await Product.updateOne({ _id: id }, req.body);
        req.flash("success", "Cập nhật sản phẩm thành công!");

        res.redirect(`/${systemConfig.prefixAdmin}/products`)
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products`)
    }
  
  

  
}

module.exports.detail=async(req,res) =>{
    try {
        const id=req.params.id
        const product=await Product.findOne({
            _id:id,
            deleted:false
        })
        res.render("admin/pages/products/detail.pug",{
            pageTitle:"Chi tiet san pham",
            product:product
           
        })
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products`)
    }
}