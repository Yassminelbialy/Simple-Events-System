let express=require("express");
let adminRouter=express.Router();


adminRouter.get("/profile/:userName",(request,response)=>{
    response.render("auth/adminProfile.ejs");
    // console.log("ggggg " + request.method);
    // response.send("Hello Admin "+request.params.userName);
})
module.exports=adminRouter;