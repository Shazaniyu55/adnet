import dbConnect from "../../../lib/mongoose";
import User from "../../../lib/model/userModel";
import { hashPassword } from "../sw-dashboard/change-password";

export default async function handler(req, res) {
  await dbConnect();
  const { email, phone, password } = req.body;
  if (email && phone && password) {
    try {
      const existingUserWithEmail = await User.findOne({ email: email });

      if (existingUserWithEmail) {
        if (existingUserWithEmail.phone === phone) {
          const hashedPassword = await hashPassword(password);
          const user = await User.findByIdAndUpdate(existingUserWithEmail._id, {
            password: hashedPassword,
          });
          res.status(201).json({
            successful: true,
            message: "Your Password was successfully changed",
            user,
          });
        } else {
          res.status(400).json({
            successful: false,
            message: "Phone Number does not exist",
            user: {},
          });
        }
      } else {
        res
          .status(400)
          .json({
            successful: false,
            message: "Email does not exist",
            user: {},
          });
      }
    } catch (err) {
      res
        .status(400)
        .json({ successful: false, message: err.message, user: {} });
    }
  } else {
    res
      .status(400)
      .json({ successful: false, message: "Invalid details", user: {} });
  }
}
