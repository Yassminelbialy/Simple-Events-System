let express = require("express");
let eventRouter = express.Router();
let mongoos = require("mongoose");
require("./../Module/eventModule");
let eventschema = mongoos.model("Events"); //Getting the collection
require("./../Module/speakerRegisterModule");
let speakerschema = mongoos.model("Speakers");


eventRouter.get("/list", (request, response) => {
    eventschema.find({}).populate({ path: "mainSpeaker otherSpeaker" }).then((data) => {
        response.render("Events/EventList.ejs", { events: data });
        // response.send(data);
    }).catch((error) => { console.log(error + "") })
})//list , get

eventRouter.get("/add", (request, response) => {
    speakerschema.find()
        .then((data) => {
            response.render("Events/EventAdd.ejs", { speakers: data });
        }).catch((error) => { console.log(error + "") })
});// add, get


eventRouter.post("/add", (request, response) => {
    new eventschema(request.body).save()
        .then((data) => {
            response.redirect("/event/list");
        }).catch((error) => { console.log(error + "") });
})// add, post


eventRouter.get("/edit/:_id", (request, response) => {
    speakerschema.find()
        .then((speakers) => {
            eventschema.findById({ _id: request.params._id }).populate({ path: "mainSpeaker otherSpeaker" })
                .then((event) => {
                    response.render("Events/EventEdit.ejs", { speakers,event });
                }).catch((error) => { console.log(error + "") })

        }).catch((error) => { console.log(error + "") })
})//edit , get

eventRouter.post("/edit", (request, response) => {
    eventschema.updateOne({ _id: request.body._id }, { $set: request.body }).populate({ path: "mainSpeaker otherSpeaker" })
        .then((data) => {
            response.redirect("/event/list");
        }).catch((error) => { console.log(error + "") });
});//edit , post
eventRouter.get("/delete/:_id", (request, response) => {
    eventschema.deleteOne({ _id: request.params._id }).then((data) => {
        response.redirect("/event/list");

    }).catch((error) => {
        console.log(error);
        console.log(request.params);

    });
});//delete

module.exports = eventRouter;