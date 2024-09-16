import react from 'react';
import Button from '@mui/material/Button';

interface data {
  name:String,
  age:number,
  isOnline:Boolean
}


const newdata: data= {
  name: "john",
  age:21,
  isOnline:true
}

const array: (String | number | Boolean )[] = []
const tuple: [String, number, Boolean][] = []


export default function Home() {
  return (

    <>

    <div>
      <Button variant="contained">Hello world</Button>
      
    </div>
    </>

  );
}
