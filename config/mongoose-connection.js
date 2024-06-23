const mongoose=require("mongoose");

mongoose
.connect("mongodb://127.0.0.1:27017/scatch")

//zaroori nhi hai ke hmesha shle agar server me koi problem aa gae to work nhi krega (mongodb ka server) to es leye hmnne error handling ke hai.(Async.) 
.then(function(){
    console.log("connected");
})
.catch(function(err){
    console.log(err);
})

module.exports = mongoose.connection;