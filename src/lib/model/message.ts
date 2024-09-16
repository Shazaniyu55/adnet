import { Schema,models,model} from "mongoose";

const messageSchema = new Schema({
    message:{type:String,required:true},
    subject:{type:String,required:true},
    seen:{type:String,default:false},
    receiverId:{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
     },
     senderId:{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
     },
     read:{
        type:Boolean,
        default:false
     }
},
{
    timestamps:true,
    versionKey:false
})

const Message = models.Message || model('Message', messageSchema)
export default Message