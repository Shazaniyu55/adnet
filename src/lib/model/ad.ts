import { Schema,model,models } from "mongoose";



const adSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    description:{
        type:String,
        required:true,
    },
    imgName:{
        type:String,
        required:true
    },
    landingPage:{
        type:String,
        required:true
    }
},
{
    timestamps:true,
    versionKey:false
})

const AdDetails = models.AdDetails || model('AdDetails', adSchema)
export default AdDetails
