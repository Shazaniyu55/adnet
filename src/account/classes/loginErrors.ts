export default class LoginError{

    message:string

    constructor(msg:string){
this.message =msg
    }

    getErrMsg=()=> this.message
    
}