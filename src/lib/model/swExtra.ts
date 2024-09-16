import { Schema,model,models } from "mongoose";



const swExtraSchema = new Schema({
    userId:{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
     },
    onAJob:{type:Boolean,default:false},
    level:{type:String,default:'Beginner'},
    catalog:[
        {
            filename:String,
            contentType:String,
            title:String,
            description:String
        }
    ],
    services:[
        {
            title:{
                type:String,
                trim:true,
                lowercase:true
            },
            skills:{
                type:[String]
            },
            
            description:{
                type:String,
                trim:true,
                max:200
            },
            category:{
                type:String,
                lowercase:true
            },
        }
    ],
    subscription:{
        type:{type:String,default:'Free'},
        subscribedDate:{type:Date},
        expiringDate:{type:Date},
        pop:{type:String},
        popConfirmed:{type:Boolean,default:false},
        locations:[{type:String}]
    },
   
    bankDetails:{
        accountName:{
            type:String,
            trim:true,
            lowercase:true
        },
        accountNumber:{
            type:String,
            trim:true,
        },
        bankName:{
            type:String,
            lowercase:true
        },
    },
    experience:[
        {
            title:{
                type:String,
                trim:true,
                lowercase:true
            },
            company:{
                type:String,
                trim:true,
                lowercase:true
            },
            onRole:{
                type:Boolean,
                default:false
            },
            state:{type:String},
            lga:{type:String},
            address:{type:String},
            description:{
                type:String,
                trim:true
            },
            startDate:{type:Date},
            endDate:Date,
        }
    ]
},
{
    timestamps:true,
    versionKey:false
})
const SWExtra = models.SWExtra || model('SWExtra', swExtraSchema)
export default SWExtra
