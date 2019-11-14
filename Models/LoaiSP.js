var mongoose=require("mongoose")

const loaispSchema= new mongoose.Schema({
    Ten: String,
    BungBau: [{type:mongoose.Schema.Types.ObjectId}]
})

module.exports=mongoose.model("LoaiSP",loaispSchema)