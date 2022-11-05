const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {   
     type: String,    
     default: "New York", 
      },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  therapist:{
    type:String,
    default:null,
  },
  token :{
    type:Number,
    default:null

  }

 // fees , link for more info(url), country, description, mode of counselling.
//coins , ques
});

const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;
