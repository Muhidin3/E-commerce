import Header from '@/app/components/Header';
import {  Box, Button, Typography } from '@mui/material'
import axios from 'axios';
import Image from 'next/image';
import React from 'react'
import { Product } from '../page';
import Link from 'next/link';
async function page({params}:{params:Promise<{id:string}>}) {
  const {id} = await params
  // console.log(id)
  
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)


  const data:Product = res.data.data
  return (
    <div>
      <Header/>
      <Box sx={{mt:1,p:2}}>
        <div style={{maxHeight:'400px',width:'100%',backgroundColor:'black'}} className='rounded-2xl'>
          <Image style={{maxHeight:'400px',justifySelf:'center',width:'auto'}} src={`https://ecom-mauve-eight.vercel.app/uploads/${data.image}`} alt='Product image' width={1000} height={1000}/>
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
                <Button variant='contained' sx={{m:1}}> <Link href={`/message/${data.userid as string}`}>Message</Link></Button>
                <Button variant='contained' sx={{m:1}}> <Link href={`tel:091234567`}>Call</Link></Button>
              <Typography variant='body2' sx={{color:'silver'}}>Posted 3 days ago</Typography>
              

            </Box>
      </Box>
    </div>
  )
}

export default page