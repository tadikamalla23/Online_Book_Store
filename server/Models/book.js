var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bookSchema=new Schema({
    bookName:{type:String, required:true},
    author:{type:String, required:true},
    price:{type:Number, required:true},
    category:{type:String, required:true},
    imageURL:{type:String,required:true},
    description:{type:String},
    publishedDate:{type:Date, required:true},
});
var books=mongoose.model('books',bookSchema);
module.exports=books;