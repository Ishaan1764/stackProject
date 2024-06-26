const express=require('express');
const router=express.Router();

const ownerModel=require("../models/owner-models");


if(process.env.NODE_ENV==="development"){
    router.post("/create",async function(req,res){
        let owners= await ownerModel.find();
        if(owners.length>0){ 
            return res
                .status(503)
                .send("You don't have permission to create a new owner.");
        }

        let{fullname,email,password}=req.body;
        let ownerCreated=await ownerModel.create({
            fullname,
            email,
            password
        });
        res.send("We can create a new Owner!!");
        ownerModel.delete({
            fullname,
            email,
            password
        })
    });

    
}
router.get("/",(req,res)=>{
    res.send("hey I am Owner");
});
//if i want ke yeh sirf development phase me chle then:
//+console.log(process.env.NODE_ENV);
module.exports=router;