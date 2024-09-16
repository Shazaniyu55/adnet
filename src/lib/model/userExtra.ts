import { Schema,model,models } from "mongoose";



const userExtraSchema = new Schema({
    userId:{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
     },
    comments:[
        {
            comment:{type:String}, rating:{type:Number},
            raterId:{ 
                type: Schema.Types.ObjectId,
                ref: 'User',
             },
             date:{type:Date}
        }
    ],
  
},
{
    timestamps:true,
    versionKey:false
})
const UserExtra : any = models.UserExtra || model('UserExtra', userExtraSchema)
export default UserExtra
