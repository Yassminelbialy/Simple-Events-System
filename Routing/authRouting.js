let express = require("express");
let authenticationRouter = express.Router();
let mongoos = require("mongoose");
require("./../Module/speakerRegisterModule");
let schema = mongoos.model("Speakers") //Getting the collection

//*********Routing methods//
authenticationRouter.get("/login", (request, response) => {
    response.render("auth/login.ejs");
})//login , get


authenticationRouter.post("/login", (request, response) => {
    if (request.body.userName == "yassmin" && request.body.password == "123") {
        request.session.role = 'admin';
        request.session.userName = "Yassmin"
        response.redirect(`/admin/profile/yassmin`);
    } else {
        schema.findOne({ userName: request.body.userName })
            .then((data) => {
                if (data.userName == request.body.userName && data.password == request.body.password) {
                    request.session.role = 'speaker';
                    request.session.UserId = data._id;
                    request.session.userName = data.userName;
                    console.log("ohhhhhhhhhh-------------------------------------------------------" + data._id)
                    response.redirect(`/speaker/profile/${data._id}`);
                } else
                    response.redirect(`/login`);
            }).catch((error) => {
                response.redirect(`/login`);
                console.log(error + "");
            });
    }
})//login,post 
authenticationRouter.get("/register", (request, response) => {
    response.render("auth/register.ejs");
});//sign up
authenticationRouter.post("/register", (request, response) => {
    new schema({
        _id: request.body.id, userName: request.body.userName, password: request.body.password,
        fullName: request.body.fullName, age: request.body.age,
        address: {
            city: request.body.city,
            street: request.body.street, buliding: request.body.buliding
        }
    }).save().then((data) => {
        response.redirect(`/login`);
        console.log("Done");
    }).catch((error) => {
        console.log(error + "");
        response.redirect(`/register`);
    });
});//sign up

authenticationRouter.get("/logout", (request, response) => {
    request.session.destroy();
    response.redirect(`/login`);
});//logout


module.exports = authenticationRouter;