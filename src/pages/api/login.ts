

export default function handler(req: any, res: any){
    return res.status(200).json({status: "success", message:"welcome"})
}