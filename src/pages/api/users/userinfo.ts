import User from "@/lib/model/userModel"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {userId} = req.body
    try{
        const user = await User.findOne({_id:userId})
        res.json(user)
    }catch(err:any){
        console.log(err)
        res.json({errMsg:err.message})
    }
    
    
    
}