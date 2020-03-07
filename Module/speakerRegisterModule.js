let mongoose = require("mongoose");
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
speakerSchema = new mongoose.Schema({
    // _id: Number,
    userName: String,
    password: Number,
    fullName: String,
    age:Number,
    address: {
        city: String,
        street: Number,
        buliding: Number
    }
});

speakerSchema.plugin(autoIncrement.plugin, 'Speakers');
//mapping 
mongoose.model("Speakers", speakerSchema); //setting the collection