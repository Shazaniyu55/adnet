
import UserExtra from "@/lib/model/userExtra"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {userId} = req.body
    try{
        const userExtra = await UserExtra.findOne({userId})
        res.json(userExtra ? userExtra.comments : null)
    }catch(err:any){
        console.log(err)
        res.json({errMsg:err.message})
    }
    
    
    
}