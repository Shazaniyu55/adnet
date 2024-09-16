

export default class Otp{

    private status:boolean
    private expirationTime:number
    private value:string

    constructor(){
        this.expirationTime = 0
        this.status = false
        this.value = ''
    }

    getValue = () => this.value
    setValue = (value:string)=>{
        this.value = value
    }
    
    getStatus = () => this.status
    setStatus = (status:boolean)=>{
        this.status = status
    }

    getExpirationTime = () => this.expirationTime
    setExpirationTime = (time:number)=>{
        this.expirationTime = time
    }

    sendOtp(){
        
    }
}