const express=require("express");
const app=express();

const cookieParser=require("cookie-parser");
const path=require("path");
const { listenerCount } = require("process");

const db=require("./config/mongoose-connection");
const ownersRouter=require("./routes/ownersRouter");
const productsRouter=require("./routes/productRouter");
const index=require("./routes/index");
const usersRouter=require("./routes/userRouter");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");




//routes
app.use("/",index);
app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);
app.listen(3001);