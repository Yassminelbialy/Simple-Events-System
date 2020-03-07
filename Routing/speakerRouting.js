let express = require("express");
let speakerRouter = express.Router();
let mongoos = require("mongoose");
require("./../Module/speakerRegisterModule");
let speakerschema = mongoos.model("Speakers") //Getting the collection
require("./../Module/eventModule");
let eventschema = mongoos.model("Events");

speakerRouter.get("/profile/:id", (request, response) => {
    // if (request.session.rolr == 'speaker') {
        speakerschema.findById(request.params.id).then((userData) => {
            eventschema.find({}).then((eventsData) => {
                response.render("auth/speakerProfile.ejs", { userData, eventsData }).catch((error) => {
                    console.log("error ------ " + error)
                });
            }).catch((err) => {
                console.log("error -----" + err)
            })

        })
    // } else {
    //     response.redirect(`/admin/profile/${request.session.userName}`)
    // }
});// profile , get
speakerRouter.get("/list", (request, response) => {
    speakerschema.find()
        .then((data) => {
            response.render("Speakers/speakerList.ejs", { speakers: data })
        }).catch((error) => { console.log(error + "") })
});//list , get


speakerRouter.get("/add", (request, response) => {
    // response.render("auth/register.ejs");
});//add , get


speakerRouter.post("/add", (request, response) => {
    
}); // add , post


speakerRouter.get("/edit/:_id", (request, response) => {
    speakerschema.findById({ _id: request.params._id }).then((data) => {
        response.render("Speakers/speakerEdit.ejs", { speaker: data, Role: request.session.role });
    }).catch((error) => {
        console.log(error + "");
        console.log(request.params);
    })
});//edit , get


speakerRouter.post("/edit/:_id", (request, response) => {
    speakerschema.updateOne({ _id: request.params._id }, { $set: request.body })
        .then((data) => {
            if (request.session.role == 'admin') {
                response.redirect("/speaker/list");
            } else if (request.session.role == 'speaker') {
                response.redirect(`/speaker/profile/${request.session.UserId}`);

            }
        }).catch((error) => { console.log(error + "") });
});//edit , post


speakerRouter.post("/delete", (request, response) => {
    speakerschema.deleteOne({ _id: request.body.id }).then((data) => {
        response.send(data)
    }).catch((error) => { });
});//delete, post

module.exports = speakerRouter;