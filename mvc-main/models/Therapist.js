const mongoose = require("mongoose");

const TherapistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {   
     type: String,    
     default: "00000000000", 
      },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
 fees: {
    type: Number,
    required: true,
  },
  link:{
      type: String,
      required:true,
  },
 
  description: {
    type: String,
    required: true,
  },
  patient:[{
type:String,
default :null
  }]
  
 // fees , link for more info(url), country, description, mode of counselling.
});

const Therapist = mongoose.model("Therapist", TherapistSchema);
module.exports = Therapist;
