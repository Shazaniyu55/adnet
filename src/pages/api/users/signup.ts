import dbConnect from "../../../lib/mongoose";
import User from "../../../lib/model/userModel";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const { email, phone, password, type, typeClass } = req.body;

  if (email && phone && password && type && typeClass) {
    try {
      const existingUserWithEmail = await User.findOne({ email: email });

      if (existingUserWithEmail) {
        res
          .status(400)
          .json({
            successful: false,
            message: "An account already exist with the email",
            user: {},
          });
      } else {
        const existingUserWithPhone = await User.findOne({ phone: phone });
        if (existingUserWithPhone) {
          res
            .status(400)
            .json({
              successful: false,
              message: "An account already exist with the phone number",
              user: {},
            });
        } else {
          const newUser = await User.create(req.body);
          newUser.password = await newUser.password;
          const user = await newUser.save();
          res
            .status(201)
            .json({
              successful: true,
              message: "Your account was successfully created",
              user,
            });
        }
      }
    } catch (err: any) {
      console.log(err);
      res
        .status(400)
        .json({ successful: false, message: err.message, user: {} });
    }
  } else {
    res
      .status(400)
      .json({
        successful: false,
        message: "Invalid registration details",
        user: {},
      });
  }
}
