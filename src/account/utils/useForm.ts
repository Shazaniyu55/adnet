import { useState } from "react"

export default function UseForm(initialValues:any){
    const [values,setValues] = useState(initialValues)
      //handle input change
  const handleInputChange=(e:any)=>{
    const {name,value} = e.target
    setValues({
      ...values,
      [name]:value
    })
  }
    return{
        values,
        setValues,
        handleInputChange
    }
}