import Account from "../account"

export default abstract class AccountValidator{

    protected emailErrMsg:string
    protected passwordErrMsg:string
    protected errorMsg:string
    protected isPasswordValid:boolean
    protected isEmailValid:boolean

    constructor(){
        this.emailErrMsg = ''
        this.passwordErrMsg = ''
        this.errorMsg = ''
        this.isEmailValid = false
        this.isPasswordValid = false
    }

    getEmailErrMsg = ()=>this.emailErrMsg
    setEmailErrMsg = (errMsg:string)=>this.emailErrMsg = errMsg

    getPasswordErrMsg = ()=>this.passwordErrMsg
    setPasswordErrMsg = (errMsg:string)=>this.passwordErrMsg = errMsg

    getErrorMsg = ()=>this.errorMsg
    setErrorMsg = (errMsg:string)=>this.errorMsg = errMsg

    getIsEmailValid = ()=>this.isEmailValid

    getIsPasswordValid = ()=>this.isPasswordValid

    abstract validateDetails(details:Account):void

    validateEmail = (account:Account)=>{
        if(account.getEmail()  === ''){
            this.isEmailValid = false
            this.emailErrMsg = "Email can not be empty"
        }else{
            this.isEmailValid = true
            this.emailErrMsg = ""
        }
    }
    validatePassword = (account:Account)=>{
        
        if(account.getPassword()  === ''){
            this.isPasswordValid = false
            this.passwordErrMsg = "Password can not be empty"
        }else{
            this.isPasswordValid = true
            this.passwordErrMsg = ""
        }
    }
}