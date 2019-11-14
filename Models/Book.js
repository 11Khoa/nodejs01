var mongoose=require('mongoose');
const bookSchema= new mongoose.Schema({
    name:String,
    price:Number
})

module.exports = mongoose.model("Book", bookSchema);