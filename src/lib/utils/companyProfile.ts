
import {object,string} from 'yup'
import { CompanyInfo } from '../types/userInfo'

export const companyInfoSchema = object({
    name: string().required('Company Name is required'),
   
    officeAddress: string().required('Office Address is required'),
    state: string().required('State is required'),
    lga: string().required('L.G.A is required'),
    description: string().max(200,'Description should not be more than 200 characters').required('Description is required'),
  })

  export const companyInfoValues :CompanyInfo={
    name:'',
    email:'',
    phone:'',
    state:'',
    lga:'',
    officeAddress:'',
    description:'',
    userId : ''
  }