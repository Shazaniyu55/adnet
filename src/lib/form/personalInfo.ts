
import axios from "axios"


    
  //sign up submit handler
  const submitHandler = async (values:any,router:any,url:string)=>{
  
    
    try{
        const res = await axios({
              method:'POST',
              url:`${process.env.SMNK_URL}${url}`,
              data:values
          })
        const data = await res.data
        
        if(data.isInfoAdded){
          alert(data.Message)
            router.push('/')
          
        }else{
          alert(data.Message)
        }
        
    }catch(err:any){
      alert(err.response.data.Message)
    }
}

  
  //formik submit handler
  export  const formikSubmitHandler = (values:any,formikHelpers:any,router:any,url:string)=>{
  
    return new Promise(res=>{
          formikHelpers.validateForm().then(async (data:any)=>{
              const msg = await submitHandler(values,router,url)
              res(msg)
          }).catch((err:any)=>{
            alert(err)
          })              
    })

  }