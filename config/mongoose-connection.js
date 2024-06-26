const mongoose=require("mongoose");
const config=require("config");
const dbgr=require("debug")("development:mongoose");//kuch bhi lekh skte ho.;


mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`)//${config.get("MONGODB_URI" this works on the bases ke (env) variable ke value khya hai.

//zaroori nhi hai ke hmesha shle agar server me koi problem aa gae to work nhi krega (mongodb ka server) to es leye hmnne error handling ke hai.(Async.) 
.then(function(){
    dbgr("connected");
})
.catch(function(err){
    console.log(err);
})

module.exports = mongoose.connection;