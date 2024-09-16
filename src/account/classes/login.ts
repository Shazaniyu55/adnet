

import Account from "./account"
import Otp from "./otp"


export default class LoginDetails extends Account{

    private phone:string
    private otp:Otp
    constructor(){
        super()
        this.phone = ''
        this.otp = new Otp()
    }

    getOtp = ()=> this.otp
    
    getPhone = ()=> this.phone
    setPhone = (phone:string)=>{
        this.phone = phone
    }

    submit():boolean{
        return true
    }

    redirect(url:string):void{
        
    }
   
}