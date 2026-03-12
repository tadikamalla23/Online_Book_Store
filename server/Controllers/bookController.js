var express=require('express');
var bodyParser=require('body-parser');
var syncJsonData = require('../utils/syncJsonData');
var books=require('../Models/book');
var category=require('../Models/category');
var author=require('../Models/author');
var router=express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));
router.get('/getBooks',(req,res)=>{
        books.find({}).then((books)=>{
            if(books.length>0){
                return res.send({message:true,books:books});
            }else{
                return res.send({message:"Could not find books"});
            }
        }).catch((err)=>res.send({message:err.message}));
});

router.get('/getBook/:name',(req,res)=>{
    books.find({bookName:req.params.name},function(err,book){
        if(book){
            res.send(book);
        }else{
            res.send("No books found with that name");
        }
    })
});
router.get('/getBookById/:id',(req,res)=>{
    books.findOne({_id:req.params.id}).then((book)=>{
        if(book){
            res.send({message:true,book:book});
        }else{
            res.send({message:"No book found"});
        }
    }).catch((err)=>{res.send({message:"404 error"})});
});


router.get('/getBookByCategory/:category',(req,res)=>{
    books.find({category:req.params.category}).then((books)=>{
        if(books.length>0){
            res.send({message:true,books:books});
        }else{
           res.send({message:"No books found with that Category"}); 
        }
    }).catch((err)=>res.send({message:err.message}));
        
    
});
router.get('/getBookByAuthor/:author',(req,res)=>{
    books.find({author:req.params.author}).then((books)=>{
        if(books.length>0){
            res.send({message:true,books:books});
        }else{
           res.send({message:"No books found with that Author"}); 
        }
    }).catch((err)=>res.send({message:err.message}));
        
    
});
// router.post('/addBook',async (req,res)=>{
//     var existingAuthor=await author.findOne({name:req.body.author});
//     if(!existingAuthor){
//         var newAuthor=author({
//             name:req.body.author,
//             emailId:"unknown",
//             contactNo:0,
//             address:"unknown"
//         });
//         await newAuthor.save();
//     }

//     var existingCategory=await category.findOne({name:req.body.category});
//     if(!existingCategory){
//         var newCategory=category({name:req.body.category});
//         await newCategory.save();
//     }
//     var newBook=books({
//         bookName:req.body.bookName,
//         author:req.body.author,
//         price:req.body.price,
//         category:req.body.category,
//         imageURL:req.body.imageURL,
//         description:req.body.description,
//         publishedDate:req.body.date
//     });
   
//     newBook.save().then(async(result)=>{
//         if(result){
//             await syncJsonData();
//             res.send({message:true})
//         }else{
//             res.send({message:"couldnot save"});
//         }
//     }).catch(err=>res.send({message:"404 error"}));
// });
router.post('/addBook', async (req,res)=>{
    try{
        console.log("FULL BODY:", req.body);

        var authorName = req.body.author ? req.body.author.trim() : "";
        var categoryName = req.body.category ? req.body.category.trim() : "";

        console.log("authorName:", authorName);
        console.log("categoryName:", categoryName);

        var existingAuthor = await author.findOne({name: authorName});
        console.log("existingAuthor:", existingAuthor);

        if(!existingAuthor){
            var newAuthor = new author({
                name: authorName,
                emailId: "unknown@gmail.com",
                contactNo: 1234567890,
                address: "unknown"
            });

            var savedAuthor = await newAuthor.save();
            console.log("savedAuthor:", savedAuthor);
        }

        var existingCategory = await category.findOne({name: categoryName});
        console.log("existingCategory:", existingCategory);

        if(!existingCategory){
            var newCategory = new category({name: categoryName});
            var savedCategory = await newCategory.save();
            console.log("savedCategory:", savedCategory);
        }

        // create book
        var newBook = books({
            bookName:req.body.bookName,
            author:authorName,
            price:req.body.price,
            category:categoryName,
            imageURL:req.body.imageURL,
            description:req.body.description,
            publishedDate:req.body.date
        });

        var result = await newBook.save();

        if(result){
            await syncJsonData();
            res.send({message:true});
        }else{
            res.send({message:"couldnot save"});
        }

    }
    catch(err){
        console.log("ADD BOOK ERROR:",err);
        res.send({message:err.message});
    }
});
router.post('/deleteBook/:id',(req,res)=>{
    books.findByIdAndRemove({_id:req.params.id}).then(async ()=>{
        await syncJsonData();
        res.send({message:true});
    }).catch(err=>res.send({message:err.message}));
});
router.post('/addCategory/:category',(req,res)=>{
    category.findOne({name:req.params.category}).then((result)=>{
        if(result){
            res.send({message:"Category already exists"});
        }else{
            var newCategory=category({name:req.params.category});
                newCategory.save().then(async (result)=>{
                    if(result){
                        await syncJsonData();
                        res.send({message:true});
                    }else{
                        res.send({message:"Could not save"});
                    }
                }).catch((err)=>res.send({message:"404 error"}));
        }
    })
    
})
router.get('/getCategories',(req,res)=>{
    category.find({}).then((result)=>{
        if(result.length>0){
            res.send({message:true,categories:result});
        }else{
            res.send({message:"No Categories to display"});
        }
    }).catch((err)=>res.send({message:"404 error"}));
})
router.post('/deleteCategory/:id',(req,res)=>{
    category.findByIdAndRemove({_id:req.params.id}).then(async ()=>{
        await syncJsonData();
        res.send({message:true});
    }).catch(err=>res.send({message:err.message}));
});
router.post('/addAuthor',(req,res)=>{
    author.findOne({name:req.body.name}).then((result)=>{
        if(result){
            res.send({message:"Author already exists"});
        }else{
            var newAuthor=author({name:req.body.name,contactNo:req.body.contactNo,emailId:req.body.emailId,address:req.body.address});
                newAuthor.save().then(async (result)=>{
                    await syncJsonData();
                    if(result){
                        res.send({message:true});
                    }else{
                        res.send({message:"Could not save"});
                    }
                }).catch((err)=>res.send({message:"404 error"}));
        }
    })
    
})

router.get('/getAuthors',(req,res)=>{
    author.find({}).then((result)=>{
        if(result.length>0){
            res.send({message:true,authors:result});
        }else{
            res.send({message:"No Authors to display"});
        }
    }).catch((err)=>res.send({message:"404 error"}));
})
router.post('/deleteAuthor/:id',(req,res)=>{
    author.findByIdAndRemove({_id:req.params.id}).then(async ()=>{
        await syncJsonData();
        res.send({message:true});
    }).catch(err=>res.send({message:err.message}));
});
router.get('/search/:name',(req,res)=>{
        books.find({"bookName":{$regex : `^${req.params.name}.*` , $options: 'si' }}).then((searchedBooks)=>{
            if(searchedBooks.length>0){
                res.send(searchedBooks);
            }else{
                books.find({"category":{$regex : `^${req.params.name}.*` , $options: 'si' }}).then((searchedBooks)=>{
                    if(searchedBooks.length>0){
                        res.send(searchedBooks);
                    }else{
                        books.find({"author":{$regex : `^${req.params.name}.*` , $options: 'si' }}).then((searchedBooks)=>{
                            res.send(searchedBooks);
                         }
                         ).catch((err)=>{
                             res.send(err.message);
                         });
                    }
                }).catch((err)=>{
                    res.send(err.message);
                });
            }
            
        }).catch((err)=>{
            res.send(err.message);
        });
    
  
});
router.put('/updateAuthor/:id',(req,res)=>{
    author.findById({_id:req.params.id}).then((oldAuthor)=>{
        if(!oldAuthor){
            return res.send({message:"Author not found"});
        }

        var oldAuthorName=oldAuthor.name;

        author.findByIdAndUpdate(
            {_id:req.params.id},
            {
                name:req.body.name,
                contactNo:req.body.contactNo,
                emailId:req.body.emailId,
                address:req.body.address
            },
            {new:true}
        ).then(async(result)=>{
            await books.updateMany(
                {author:oldAuthorName},
                {$set:{author:req.body.name}}
            );

            await syncJsonData();

            if(result){
                res.send({message:true,author:result});
            }else{
                res.send({message:"Could not update author"});
            }
        }).catch((err)=>res.send({message:err.message}));
    }).catch((err)=>res.send({message:err.message}));
});
router.put('/updateCategory/:id',(req,res)=>{
    category.findById({_id:req.params.id}).then((oldCategory)=>{
        if(!oldCategory){
            return res.send({message:"Category not found"});
        }

        var oldCategoryName=oldCategory.name;

        category.findByIdAndUpdate(
            {_id:req.params.id},
            {
                name:req.body.name
            },
            {new:true}
        ).then(async(result)=>{
            await books.updateMany(
                {category:oldCategoryName},
                {$set:{category:req.body.name}}
            );

            await syncJsonData();

            if(result){
                res.send({message:true,category:result});
            }else{
                res.send({message:"Could not update category"});
            }
        }).catch((err)=>res.send({message:err.message}));
    }).catch((err)=>res.send({message:err.message}));
});
module.exports=router;