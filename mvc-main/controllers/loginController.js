const Therapist = require("../models/Therapist");
const passport = require("passport");
const Patient = require("../models/patient");
const bcrypt = require("bcryptjs");

//For Register Page
const registerViewPatient = (req, res) => {
  res.render("register", {});
};
const therapist_db=(req,res)=>{
  // const items = [];

  Therapist.find({}, (err, tasks) => {
      if (err) {
          console.log(err);
      } else {
        console.log(tasks);
        console.log(typeof(tasks));

         
      }

      res.render('therapist-db', {tasks : tasks });
  });
  
}
//Post Request for Register

const registerPatient = (req, res) => {
  console.log(req);
  console.log(req.body);
  const { name , phone ,  email,password, confirm } = req.body;

  if (!name || !phone || !email || !password || !confirm) {
    console.log("Fill empty fields");
  }

  //Confirm Passwords

  if (password !== confirm) {
    console.log("Password must match");
  } else {
    //Validation
    Patient.findOne({ email: email }).then((Patient) => {
      if (Patient) {
        console.log("email exists");
        res.redirect('back');
      //   // res.render("registerPatient", {
      //  //   name,
      //    // email,
      //   //password,
      //     //confirm,
      //   });
      } else {
        //Validation
        const newPatient = new Patient({
          name,
          phone ,
          email,
          password,
        });``
        //Password Hashing
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newTherapist.password, salt, (err, hash) => {
            if (err) throw err;

            newPatient.password = hash;
            newPatient
              .save()
              .then(res.redirect("/loginPatient"))
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
};

// For View
const loginViewPatient = (req, res) => {
  res.render("loginPatient", {});
};
const homepage=(req ,res)=>{
  res.render()
}

//Logging in Function

const loginPatient = (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;

  //Required
  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.redirect('back');

    // res.render("loginPatient", {
    //   email,
    //   password,
    // });
  } else {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/loginPatient",
      failureFlash: true,
    })(req, res);
  }
};
//////////////////////////////////////////////Therapist
const registerViewTherapist = (req, res) => {
  res.render("registerTherapist", {});
};

//Post Request for Register

const registerTherapist = (req, res) => {
  const { name,phone ,  email,password,fees,link,description ,confirm } = req.body;
console.log(req.body);
  if (!name || !phone || !email || !password||!fees||!link||!description || !confirm) {
    console.log("Fill empty fields");
  }

  //Confirm Passwords

  if (password !== confirm) {
    console.log("Password must match");
  } 
  else {
    //Validation
    Therapist.findOne({ email: email }).then(() => {
      if (Therapist) {
        console.log(email);
        console.log(this.email);

        console.log(Therapist);
        console.log("email exists");
        res.redirect('back');
       
      } 
      else {
        //Validation
        const newTherapist = new Therapist({
          name,
          phone ,
          email,
          fees,
          link,
          description, 
          password,
        });
        //Password Hashing
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newTherapist.password, salt, (err, hash) => {
            if (err) throw err;

            newTherapist.password = hash;
            newTherapist
              .save()
              .then(res.redirect("/loginTherapist"))
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
};

// For View
const loginViewTherapist = (req, res) => {
  res.render("loginTherapist", {});
};

//Logging in Function

const loginTherapist = (req, res) => {
  const { email, password } = req.body;

  //Required
  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.redirect('back');

  } else {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/loginTherapist",
      failureFlash: true,
    })(req, res);
  }
};














registerPatient1 = async function(req , res){
  try{
  const userEmail = await Patient.findOne({email: req.body.email});
  if(userEmail){
      return res.status(400).send({
          message:"Email Already Exists"
      })

  }
  if(req.body.password != req.body.confirm){
    console.log(req.body);
    
      return res.status(400).send({
          message:"Password and Confirm Password does not match"
      })
  }
  const newUser = await Patient.create(req.body);



      return res.status(200).send({
          message:"User Created Successfully",
          data:newUser
      })
  }catch(err){
      console.log(err);
      res.status(500).send({
          message:"There was an error in creating the user"
      })
  }


}



registerTherapist1 = async function(req , res){
  try{
  const userEmail = await Therapist.findOne({email: req.body.email});
  if(userEmail){
      return res.status(400).send({
          message:"Email Already Exists"
      })

  }

  if(req.body.password != req.body.confirm){
      return res.status(400).send({
          message:"Password and Confirm Password does not match"
      })
  }
  const newUser = await Therapist.create(req.body);

  // const {password , confirmPassword , ...info} = newUser._doc;

      return res.status(200).send({
          message:"User Created Successfully",
          data:newUser
      })
  }catch(err){
      console.log(err);
      res.status(500).send({
          message:"There was an error in creating the user"
      })
  }


}

loginPatient1 = async function(req , res){
  try{
      const user = await Patient.findOne({email: req.body.email});
      if(!user){
          return res.json({
              message:"User does not exist"
          })
      }

      if(user.password != req.body.password){
          return res.status(400).json({
              message:"Password is incorrect"
          })
      }

    
      
      return res.status(200).json({
          message:"User Logged In Successfully",
      })

  }catch(err){
      console.log(err);
      res.status(500).send({
          message:"There was an error in logging in the user"
      })
  }

}

loginTherapist1 = async function(req , res){
  try{
      const user = await Therapist.findOne({email: req.body.email});
      if(!user){
          return res.json({
              message:"User does not exist"
          })
      }

      if(user.password != req.body.password){
          return res.status(400).json({
              message:"Password is incorrect"
          })
      }

    
    res.render('/patient',{user: user } )

  }catch(err){
      console.log(err);
      res.status(500).send({
          message:"There was an error in logging in the user"
      })
  }

}




module.exports = {
  registerViewPatient,
  loginViewPatient,
  // registerPatient,
  // loginPatient,
  registerViewTherapist,
  loginViewTherapist,
  therapist_db,
  loginTherapist1,
  registerTherapist1,
  loginPatient1,
  registerPatient1,
  // registerTherapist,
  // loginTherapist,
};
