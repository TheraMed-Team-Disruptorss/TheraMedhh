module.exports.upload = function (req, res) {
  return res.send("This is file");
};

const sendOTPVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const userOTPVerification = await UserOTPVerification.create({
      userId: user._id,
      otp,
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "OTP Verification",
      html: `<h1>OTP Verification</h1>
      <p>OTP: ${otp}</p>`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          message: "Error in sending email",
        });
      }
      return res.status(200).json({
        message: "OTP sent to email",
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Error in sending email",
    });
  }
}
