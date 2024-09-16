import Account from "../account";
import LoginDetails from "../login";
import Otp from "../otp";
import AccountValidator from "./accountValidator";
import OtpValidator from "./otpValidator";

export default class LoginValidator extends AccountValidator{
private phoneErrMsg:string
private isPhoneValid:boolean

    constructor(){
        super()
this.phoneErrMsg = ''
this.isPhoneValid = false
    }

getPhoneErrMsg():string 
{
    return this.phoneErrMsg
}
getIsPhoneValid():boolean 
{
    return this.isPhoneValid
}

    validateDetails(details:Account): void {
        this.isEmailValid && this.isPasswordValid && 
        this.isPhoneValid  ?
        details.setIsDetailsValid(true) : details.setIsDetailsValid(false)
    }

    validatePhone(login:LoginDetails): void {
        if(login.getPhone() === ''){
            this.isPhoneValid = false
            this.phoneErrMsg = 'Phone number can not be empty'
        }else{
            this.isPhoneValid = true
        this.phoneErrMsg = ''
        }
        
    }

    doesPhoneExist(login:LoginDetails): void {
        if(false){
            this.isPhoneValid = false
            this.phoneErrMsg = 'Phone number does not exist'
        }else{
            this.isPhoneValid = true
            this.phoneErrMsg = ''
        }
        
    }
}