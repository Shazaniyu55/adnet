import Account from "../account";
import LoginDetails from "../login";
import SignUpDetails from "../signup";
import AccountValidator from "./accountValidator";

export default class SignUpValidator extends AccountValidator{
private confirmPasswordErrMsg:string
private isConfirmPasswordValid:boolean

    constructor(){
        super()
this.confirmPasswordErrMsg = ''
this.isConfirmPasswordValid = false
    }

    validateDetails(details: SignUpDetails): void {
        details.setIsDetailsValid(false)
    }

    validateConfirmPassword(signup:SignUpDetails): void {
        if(signup.getConfirmPassword() === ''){
            this.isConfirmPasswordValid = false
            this.confirmPasswordErrMsg = 'Confirm Password can not be empty'
        }else{
            this.isConfirmPasswordValid = true
        this.confirmPasswordErrMsg = ''
        }
        
    }

    doesEmailExist(signup:SignUpDetails): void {
        if(true){
            this.isEmailValid = false
            this.emailErrMsg = 'Email already exist'
        }else{
            this.isEmailValid = true
            this.emailErrMsg = ''
        }
        
    }
}