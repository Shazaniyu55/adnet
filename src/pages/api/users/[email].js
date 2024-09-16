import dbConnect from '../../../lib/mongoose'
import User from '../../../lib/model/userModel'

export default async function handler(req,res){
    //get database connection
    await dbConnect()

    const {query:{email}} = req
    
    try{
        const user = await User.findOne({email:email})
        res.json(user)
    }catch(err){
        res.json({errMsg:err.message})
    }
    
    
    
}