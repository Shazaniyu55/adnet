
  import { Schema,model,models } from "mongoose";


const companyInfoSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercas:true
    },
    state:{type:String,required:true},
    lga:{type:String,required:true},
    officeAddress:{type:String,required:true},
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

const CompanyProfile = models.CompanyProfile || model('CompanyProfile', companyInfoSchema)
export default CompanyProfile
