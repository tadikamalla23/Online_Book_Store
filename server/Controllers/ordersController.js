var express=require('express');
var bodyParser=require('body-parser');
var router=express.Router();
var orders=require('../Models/orders.js');
var cart=require('../Models/shoppingCart.js');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));
router.post('/placeOrder',(req,res)=>{
    let cartItemList=req.body.cartItems;
    let orderList=orders({orderedItems:cartItemList,userName:req.body.userName});
    orderList.save().then((orderedList)=>{
        if(orderedList){
            cart.deleteMany({userName:req.body.userName}).catch(err=>res.send({message:err.message}));
            res.send({message:true});
        }else{
            res.send({message:false});
        }
    }).catch((err)=>res.send({message:err.message}));

});
router.get('/orderedItems',(req,res)=>{
    orders.find({userName:req.query.userName}).then((orderedItemList)=>{
        if(orderedItemList){
            res.send({message:true,orders:orderedItemList});
        }else{
            res.send({message:false});
        }
        
    }).catch((err)=>res.send({message:err.message}));
});
module.exports=router;