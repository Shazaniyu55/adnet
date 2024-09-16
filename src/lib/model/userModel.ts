import { Schema, model, models } from "mongoose";
// import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      lowercase: true,
    },
    typeClass: {
      type: String,
      required: true,
      lowercase: true,
    },
    verification: {
      idCardUrl: { type: String },
      capturedPhotoUrl: { type: String },
      kycVerified: { type: Boolean, default: false },
    },
    dpFileName: String,
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
// userSchema.pre('save',async function(next){
//     try{
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(this.password,salt)
//         this.password = hashedPassword
//         next()
//     }catch(error:any){
//         next(error)
//     }
// })
const User = models.User || model("User", userSchema);
export default User;
