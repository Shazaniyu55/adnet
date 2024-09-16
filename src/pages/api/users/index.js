import dbConnect from '../../../lib/mongoose'
import User from '../../../lib/model/userModel'

export default async function handler(req,res){
    //get database connection
    await dbConnect()

    //const {method,body} = req
    
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.json({errMsg:err.message})
    }
    
    
    
}