
export type IndividualPersonalInfo ={
    firstName:string,
    lastName:string,
    userName:string,
    state:string,
    lga:string,
    address:string,
    description:string,
    userId:string
}

export type LGA = {
    id:number
    name:string
  }
 export type State = {
    id:number
    name:string,
    lgas:LGA[]
  }

  export type CompanyInfo ={
    _id?:string
    name:string,
    email:string,
    phone:string,
    state:string,
    lga:string,
    officeAddress:string,
    description:string,
userId:string
  }

  export type SWExtra={
    services:[
        {
            title:string,
            skills:string[],
            description:string,
            category:string
        }
    ],
    subscription:{
        type:string,
        subscribedDate:Date,
        expiringDate:Date,
        pop:string,
        popConfirmed:boolean,
        amountPaid:number
    },
    bankDetails:{
        accountName:string,
        accountNumber:string,
        bankName:string,
    },
    experience:[
        {
            title:string,
            company:string,
            onRole:boolean,
            state:string,
            lga:string,
            address:string,
            description:string,
            startDate:Date,
            endDate:Date,
        }
    ],
    level:'Beginner' | 'Intermediate' | 'Pro',
    onAJob:boolean,
    catalog:[{filename:string,title:string,description:string}],
   
  }

 export type User ={
  _id:string,
  email:string,
  password:string,
phone:string,
type:string,
typeClass:string,
dpFileName:string,
active:boolean,
verification:{
    idCardUrl:string,
    capturedPhotoUrl:string,
    kycVerified:boolean
},
}
export type UserExtra ={
  
  rating:number,
  
  comments:[
      {
          comment:string,
          clientId:string,
      }
  ],
  
  }