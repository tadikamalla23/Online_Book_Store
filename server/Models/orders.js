var mongoose=require('mongoose');
module.exports=mongoose.model('orders',new mongoose.Schema({
    orderedItems:{type:Array},
    userName:{type:String,required:true}
}));