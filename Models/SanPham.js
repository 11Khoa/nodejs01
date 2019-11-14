var mongoose=require("mongoose")

const sanphamSchema = new mongoose.Schema({
    Ten:String,
})

module.exports= mongoose.model("SanPham",sanphamSchema)