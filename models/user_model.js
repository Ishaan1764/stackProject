
const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    fullname: String,
    email:String,
    password:String,
    cart:{
        type:Array,
        default:[]
    },
    // isadmin:boolean, hmne alag se owner model bnaya hua hai to we don't need to have this.
    orders:{
        type:Array,
        default:[]
    },
    contact:Number,
    picture:String
});

module.exports =mongoose.model("user",userSchema);