import { Schema,model,models } from "mongoose";


const personalInfoSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,lowercase:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true,lowercase:true
    },
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    state:{type:String,required:true},
    lga:{type:String,required:true},
    address:{type:String,required:true},
    description:{
        type:String,
        required:true,
        trim:true,
        max:200
    },
    userId:{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true,
        unique:true
     }
},
{
    timestamps:true,
    versionKey:false
})

const IndividualPersonalInfo = models.IndividualPersonalInfo || model('IndividualPersonalInfo', personalInfoSchema)
export default IndividualPersonalInfo
