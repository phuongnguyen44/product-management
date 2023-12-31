const Product= require("../../model/product.model")
module.exports.index = async (req,res) =>{
    const products = await Product.find({
        deleted:false,
        status:"active"
    }).sort({ position: "desc" })
    const newItem=products.map((item) =>{
        item.newPrice=(((100-item.discountPercentage)*item.price)/100).toFixed(0)
        item.discountPercentage=item.discountPercentage.toFixed(0)
        return item
    })
    res.render("client/pages/products/index",{
        pageTitle :"Danh sach san pham",
        Products:newItem
    })
}
module.exports.detail=async(req,res) =>{
    const slug=req.params.slug
    const product= await Product.findOne({
        slug:slug,
        deleted:false,
        status:"active"

    })
    product.newPrice=product.newPrice=(((100-product.discountPercentage)*product.price)/100).toFixed(0)
    res.render("client/pages/products/detail",{
        pageTitle :"chi tiet san pham",
        product:product
    })
}