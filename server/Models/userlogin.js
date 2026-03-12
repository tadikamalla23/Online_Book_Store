var mongoose=require('mongoose');
var userLogin=mongoose.model('userLogin',new mongoose.Schema({
    userName:String,
    password:String
    })
);
module.exports=userLogin;