import Products from '../components/Products'
import axios from 'axios';
import Header from '../components/Header';
import { Typography } from '@mui/material';

export interface Product{
  productName:string,
  condition:string,
  category:string,
  subcategory:string,
  description:string,
  image:string,
  price:number,
  _id:string,
  user?:string,
}

async function page() {

    const q = ''

    const res = await axios.get(`http://localhost:3000/api/products?q=${q}`)

  if(!res){
    return(<>
      <Header/>
      <Typography>Error fetching data</Typography>
    </>)
  }
  
  return (
    <div>
      <Header/>
      <div className=" m-1">
      <Products items={res.data.data} />
      </div>

      </div>
  )
}

export default page