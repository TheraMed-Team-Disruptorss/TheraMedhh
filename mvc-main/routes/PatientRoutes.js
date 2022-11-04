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
  loginViewTherapist,
  registerTherapist,

  loginTherapist,
} = require("../controllers/loginController");
const { dashboardView } = require("../controllers/dashboardController");
const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.get("/registerPatient", registerViewPatient);
router.get("/loginPatient", loginViewPatient);
//Dashboard
router.get("/dashboard", protectRoute, dashboardView);

//Dashboard
// router.get("/dashboard", protectRoute, dashboardView);
router.post("/loginPatient", loginPatient1);
router.post("/registerPatient", registerPatient1);

router.get("/loginTherapist", loginViewTherapist);
router.get("/registerTherapist", registerViewTherapist);
router.post("/registerTherapist", registerTherapist1);
router.post("/loginTherapist", loginTherapist1);
router.get("/" ,(req, res) => {
  res.render('index')
})
router.get("/mood-tracking" ,(req, res) => {
  res.render('mood-tracking')
})

module.exports = router;
