module.exports={
    getDbConnectionString:()=>{
        return process.env.MONGO_URI ||'mongodb://127.0.0.1:27017/online_book_store';
    },
    getPort:()=>{
        return process.env.PORT || 4000;
    }
}