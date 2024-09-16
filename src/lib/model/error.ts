
import { Schema,models,model} from "mongoose";

const errorSchema = new Schema({
    error:{},
   
},
{
    timestamps:true,
    versionKey:false
})

const Error = models.Error || model('Error', errorSchema)
export default Error