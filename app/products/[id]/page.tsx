import Header from '@/app/components/Header';
import {  Box, Typography } from '@mui/material'
import axios from 'axios';
import Image from 'next/image';
import React from 'react'
import { Product } from '../page';

async function page({params}:{params:{id:string}}) {
  const {id} = await params
  // console.log(id)
  
  const res = await axios.get(`http://localhost:3000/api/products/${id}`)


  const data:Product = res.data.res

  return (
    <div>
      <Header/>
      <Box sx={{mt:1,p:2}}>
        <div style={{height:'400px',width:'auto',backgroundColor:'black'}} className='rounded-2xl'>
          <Image style={{height:'100%',justifySelf:'center',width:'auto'}} src={`/uploads/${data.image}`} alt='Product image' width={1000} height={1000}/>
        </div>
            <Box sx={{mt:2}}>
                <Box sx={{borderBottom:'1px solid silver'}}>
                  <Typography variant='h4' sx={{display:'inline-block',mr:'20%'}}>{data.productName}</Typography>
                  <Typography variant='h6' sx={{display:'inline-block'}}>{data.price} Birr</Typography>
                </Box>
              <Typography variant='body1'>{data.description}</Typography>
            </Box>

            <Box sx={{mt:2}}>
              <Typography variant='h5'>Contact Seller: {data.user}</Typography>
              <Typography variant='body2' sx={{color:'silver'}}>Posted 3 days ago</Typography>

            </Box>
      </Box>
    </div>
  )
}

export default page