import User from "@/lib/model/userModel";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();

  const {
    query: { email },
  } = req;

  if (email) {
    try {
      const user = await User.findOne({ email });

      if (user) {
        res.json(true);
      } else {
        res.json(false);
      }
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
}
