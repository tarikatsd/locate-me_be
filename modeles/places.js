const mongoose = require("mongoose");



const placesSchema = new mongoose.Schema({
  nickname: String,
  name: String,
  latitude: Number,
  longitude: Number,
})


const Place = mongoose.model("places", placesSchema);
module.exports = Place;
