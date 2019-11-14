// "body-parser": "^1.19.0",
// "ejs": "^2.7.1",
// "express": "^4.17.1",
// "mongoose": "^5.7.8",
// "multer": "^1.4.2",
// "nodemon": "^1.19.4"

var express=require('express')
var app=express()
app.set('view engine','ejs')
app.set('views','./views')
app.use(express.static("public"))
app.listen(process.env.PORT || 3000)

//body-parser
var bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

//Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://khoa11:LNPVfyrcJnEJZv0F@serverkhoa-teeby.mongodb.net/book?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true },function(error){
    if(error){
        console.log("Error MongoDB: " + error);
    }else{
        console.log("MongoDB connected successfully")
    }
});


// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', true);
const Book=require("./Models/Book.js");  //  Models/Book
const LoaiSP=require("./Models/LoaiSP.js") //    ./Models/LoaiSP
const SanPham=require("./Models/SanPham.js")

app.get("/",function(req,res){
    LoaiSP.aggregate([{
        $lookup:({from:'sanphams',localField:'BungBau',foreignField:'_id',as:'danhsach'})
    }],
        function(err,items){
            res.render('home',{ds: items})
            // res.json(items)
    });
});



app.get('/',function(req,res){
    var ten= new Book({
        name: 'Teen',
        price: 2000
    })
    console.log(ten);
    res.send("ok");
})

app.get("/loaisp/:ten",function(req,res){
    var android=new LoaiSP({
        Ten: req.params.ten,
        BungBau:[] //LoaiSP.js
    }) // tạo loai sp mới
    android.save(function(err){
        if(err){
            res.json({kq: 0, ErrMsg:err})
        }else{
            res.json({kq:1})
        }
    })
})

app.get("/sanpham/:idloai/:tenSP",function(req,res){
    var sp1=new SanPham({Ten: req.params.tenSP})// khởi tạo 1 sp mới trong bảng

    sp1.save(function(err){
        if(err){
            res.json({kq: 0, ErrMsg: err})
        }else{
            LoaiSP.findOneAndUpdate(
                {_id: req.params.idloai}, //tim so sanh id trong bảng
                {$push: {BungBau:sp1._id}}, //add id sp1 vao bung bau
                function(err){
                    if(err){
                        res.json({key: 0, ErrMsg:err})
                    }else{
                        res.json({key:1})
                    }
                });
        }
    })
})