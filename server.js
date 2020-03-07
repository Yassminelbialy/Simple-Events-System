let express = require("express");
let server = express();
let authRouter = require("./Routing/authRouting");
let adminRouter = require("./Routing/adminRouting");
let speakerRouter = require("./Routing/speakerRouting");
let eventRouter = require("./Routing/eventRouting");
server.locals.moment = require('moment');
const session = require("express-session");
/**Connetion with DB */
let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/nodeDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data) => { console.log("DB Connected...") }).catch((error) => { console.log(error + "") });


/**********server stand up */
server.listen("8088", () => {
    console.log("start listening ............");
})

/**************Setting */
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(session({
    key: 'yassmina',
    secret: 'yassmina',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
server.set("view engine", "ejs");
let path = require("path");
server.set("views", path.join(__dirname, "Views"));
server.use(express.static(path.join(__dirname, "Public")));
server.use(express.static(path.join(__dirname, "node_modules", "bootstrap", "dist")));



//// First Middle Ware 
server.use(function (request, response, next) {
    console.log("first middle ware " + request.method);
    // response.send("wellcome........"); // if you active this line you cannt reply to user again . 
    next();
});


/**********Routing *******/
// server.get("/home", function (request, response) { response.send("wellcome........"); });
server.use(authRouter);
server.use((request, response, next) => {
    if (!request.session.role) ///if he is not an admin or speaker
         response.redirect('/login');
    next();
})
server.use((request, response, next) => {
    response.locals.userName = request.session.userName;
    response.locals.UserId = request.session.UserId;
    next();
  });
server.use("/speaker", speakerRouter);

server.use((request, response, next) => { // the next routers is for admin only
    if (request.session.role != 'admin') {
         response.redirect(`/speaker/profile/${request.session.UserId}`);
    }
    next();
})
server.use("/admin", adminRouter);
server.use("/event", eventRouter);
server.use(function (request, response) {
    console.log("Defualt middle ware " + request.method);
    response.send("defualt middle ware........")
});