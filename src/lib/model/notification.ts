import { Schema,models,model} from "mongoose";

const notificationSchema = new Schema({
    message:{type:String,required:true},
    title:{type:String,required:true},
    usersId:[{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
     }],
     toUserId:{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
     },
     readByUser:{type:Boolean,default:false},
},
{
    timestamps:true,
    versionKey:false
})

const Notification = models.Notification || model('Notification', notificationSchema)
export default Notification