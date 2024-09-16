import User from "@/lib/model/userModel"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {query:{userId}} = req
    
    try{
        const user = await User.findById(userId,{dpFileName:true,_id:false})
        if(user){
            res.json(user.dpFileName)
        }else{
            res.json('')
        }
        
    }catch(err:any){
        res.json({errMsg:err.message})
    }
    
    
    
}