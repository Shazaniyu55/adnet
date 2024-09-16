import Account from "./account";


export default class SignUpDetails extends Account{
    private confirmPassword:string

    constructor(){
        super()
        this.confirmPassword=''
    }

    setConfirmPassword = (password:string)=> this.confirmPassword = password
    getConfirmPassword = ()=> this.confirmPassword

    submit():boolean{
        return true
    }

    redirect(url:string):void{
        
    }
}