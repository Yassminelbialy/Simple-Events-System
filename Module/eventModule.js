let mongoose=require("mongoose");
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

eventSchema= new mongoose.Schema({
    // _id:Number,
    eventName:String,
    mainSpeaker:{ type:Number, ref:"Speakers"},
    otherSpeaker:[{ type:Number, ref:"Speakers"}],
    date:Date
});
eventSchema.plugin(autoIncrement.plugin, 'Events');
//mapping 
mongoose.model("Events",eventSchema);