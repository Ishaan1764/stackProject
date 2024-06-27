const userModel=require("../models/user_model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const{generateToken}=require("../utils/generateToken");

module.exports.registerUser=async function (req,res){

    // we will make use of joi library to have a check that all the data is coming and nothing is gettings missed out.
    // -> i will be using JOI later in updations.

    //2 problems 1: we dind't provide any parameter in frontend but then user will be formed but
    //if it's problem 2 : we didnt provide variable to hold that parameter then the server/app will crash.

    //so we will use try and catch.
    try{
        let{email,password,fullname}=req.body;

        let user=await userModel.findOne({email:email});
        if(user) return res.status(401).send("You Already Have an Account Please LOgin.")

        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(password,salt,async function(err,hash){
                if(err) return res.send(err.message);
                else{
                    let user= await userModel.create({
                        email,
                        password:hash,
                        fullname
                    });
                    //hum yaha vo cheez save krenge jo hme agar user fer se login krta hai to as a token kya decode krein ke hme pta lg jae ke yeh user kon hai.
                    // we created a diffenet function to generate token. in utils
                    let token=generateToken(user);

                    res.cookie("token",token);
                    res.send("user created sucessfully");
                    // res.send(token)
                }
            });
        });
    }catch(err){
        res.send(err.message);
    }
    
}

module.exports.loginUser=async function(req,res){
    let{email,password}=req.body;

    let user=await userModel.findOne({email:email});
    if(!user) return res.send("Email password Incorrect");
    
    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token=generateToken(user);
            res.cookie("token",token);
            res.send("you can login");
        }else{
            return res.send("PAssword Incorrect!!")
        }
    });
}