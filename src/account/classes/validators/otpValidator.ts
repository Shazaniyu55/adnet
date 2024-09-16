import Account from "../account"
import Otp from "../otp"

export default class OtpValidator{

    private otpErrMsg:string
    private isOtpValid:boolean

    constructor(){
        this.otpErrMsg = ''
        this.isOtpValid = false
    }

    getOtpErrMsg = ()=>this.otpErrMsg
    setOtpErrMsg = (errMsg:string)=>this.otpErrMsg = errMsg

    getIsOtpValid = ()=>this.isOtpValid
    validateOtp = (otp:Otp)=>{
        if(otp.getValue() === ''){
            this.isOtpValid = false
            this.otpErrMsg = "Otp cannot be empty "
        }else{
            this.isOtpValid = true
            this.otpErrMsg = ""
        }
        
    }
}