const express = require("express");

const {
  registerViewPatient,
  loginViewPatient,
  registerPatient,
  loginPatient,
  loginTherapist1,
  registerTherapist1,
  loginPatient1,
  registerPatient1,
  registerViewTherapist,
  therapist_db,
  loginViewTherapist,
  registerTherapist,

  loginTherapist,
} = require("../controllers/loginController");
const { dashboardView } = require("../controllers/dashboardController");
const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.get("/registerPatient", (req,res)=>{
  res.render('signUp_patient');
});
router.get("/Patient", (req,res)=>{
  res.render('patient');
});
router.get("/loginPatient", (req,res)=>{
  res.render('login_patient');
});
// router.get("/loginPatient", loginViewPatient);
//Dashboard
// router.get("/dashboard", protectRoute, dashboardView);

//Dashboard
// router.get("/dashboard", protectRoute, dashboardView);
router.post("/loginPatient", loginPatient1);
router.post("/registerPatient", registerPatient1);
router.get("/registerTherapist", (req,res)=>{
  res.render('signUp_therapist');
});
router.get("/loginTherapist", (req,res)=>{
  res.render("/SignUP and Login/login_therapist");
});
// router.get("/loginTherapist", loginViewTherapist);
// router.get("/registerTherapist", registerViewTherapist);
router.post("/registerTherapist", registerTherapist1);
router.post("/loginTherapist", loginTherapist1);
router.get("/" ,(req, res) => {
  res.render('index')
})
router.get("/therapist" ,(req, res) => {
  res.render('therapist') 
})
router.get("/therapistdb", therapist_db);


// router.get("/therapistdb" ,(req, res) => {
//   res.render('therapist-db')
// })
router.get("/mood-tracking" ,(req, res) => {
  res.render('mood-tracking')
})

module.exports = router;
