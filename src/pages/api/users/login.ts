import dbConnect from "../../../lib/mongoose";
import User from "../../../lib/model/userModel";
import bcrypt from "bcryptjs";

export default async function handler(req:any, res:any) {
  try {
    await dbConnect();

    const { email, password } = req.body;
    const validUser = await ValidateUser(email,password)
    if(validUser.valid){ res
      .status(201)
      .json({ successful: true, message: "Login was successful",user: validUser.user });
    
    }else{
      res
      .status(201)
      .json({
        successful: false,
        message: "invalid login details",
        user: {},
      });
    }
   
       
  } catch (err:any) {
    console.log(err);
    res.status(400).json({ successful: false, message: err.message, user: {} });
  }
}

export async function ValidateUser(email:string,password:string){
  if (!email || !password) return {user:null,valid:false}
    const user = await User.findOne({ email: email });

    if (!user) return {user,valid:false}

      if (bcrypt.compareSync(password, user.password)) return {user,valid:true}
      return {user,valid:false}
 
}