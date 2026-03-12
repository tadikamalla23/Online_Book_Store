var mongoose=require('mongoose');
module.exports=mongoose.model('Authors',new mongoose.Schema({
    name:{type:String,unique:true,required:true},
    emailId:{type:String,required:true},
    contactNo:{type:Number,required:true},
    address:{type:String,required:true}
}));