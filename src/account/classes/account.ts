export default abstract class Account{
    protected email:string
    protected password:string
    protected isSubmitSuccessful:boolean
    protected isDetailsValid:boolean

    constructor(){
        this.email =  ''
        this.password =  ''
    this.isSubmitSuccessful = false
    this.isDetailsValid = false
    }

    setEmail=(email:string)=>{
        this.email  = email
    }
    getEmail=()=>this.email

    setPassword=(password:string)=>{
        this.password  = password
    }
     getPassword=()=>this.password

     setIsSubmitSuccessful=(isSuccessful:boolean)=>{
this.isSubmitSuccessful = isSuccessful
     }
     getIsActionSuccessful = ()=>this.isSubmitSuccessful

     setIsDetailsValid=(isValid:boolean)=>{
        this.isDetailsValid = isValid
             }
             getIsDetailsValid = ()=>this.isDetailsValid

             abstract submit():boolean
             abstract redirect(url:string):void
}