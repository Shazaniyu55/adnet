import { User } from "../types/userInfo"

export function RedirectUser(user:User){
  
  let url = ''
  if(user){

      switch(true){
        case user.type === 'skilled worker':
          url = '/sw-dashboard'
          break
        case user.type === 'client':
          url = '/c-dashboard'
          break
        case user.type === 'admin':
          url =   '/a-dashboard'
          break
        
      }
    }
    return url
}