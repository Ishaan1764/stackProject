const express=require('express');
const router=express.Router();
const userModel=require("../models/user_model");
const bcrypt=require("bcrypt");

router.get("/",function(req,res){
    res.send("hey I am User");
});

router.post("/register",async (req,res)=>{

    // we will make use of joi library to have a check that all the data is coming and nothing is gettings missed out.
    // -> i will be using JOI later in updations.

    //2 problems 1: we dind't provide any parameter in frontend but then user will be formed but
    //if it's problem 2 : we didnt provide variable to hold that parameter then the server/app will crash.

    //so we will use try and catch.
    try{
        let{email,password,fullname}=req.body;

        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(password,salt,async function(err,hash){
                if(err) return res.send(err.message);
                else{
                    let user= await userModel.create({
                        email,
                        password:hash,
                        fullname
                    });
                    res.send(user)
                };
            });
        });
    }catch(err){
        res.send(err.message);
    }
    
})
module.exports=router;