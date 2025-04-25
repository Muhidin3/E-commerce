import React from 'react'
import Header from '../components/Header'
import { Avatar, Box, Button, Grid2, Typography, } from '@mui/material'
import PostsCard from '../components/PostsCard'
import { auth } from '../api/auth/[...nextauth]/auth'
import Link from 'next/link'
import axios from 'axios'
import EditProfile from '../components/EditProfile'

async function page() {
    const session = await auth()

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/userProducts?name=${session?.user?.id}`)
        const data = res.data.data;
        
    
  return (
    <div>
        <Header/>

        {/* profile */}
        <Box className="flex items-center justify-between p-4 rounded-xl shadow-md flex-col sm:flex-row ">

            <Box className="flex items-center space-x-4">
                <Box sx={{width:100,height:100}}>
                    <Avatar sx={{width:100,height:100}}>
                        <Typography variant='h2'>
                            {session?.user?.name?.slice(0,1).toLocaleUpperCase() || 'P'}
                        </Typography>
                    </Avatar>
                </Box>
                <Typography variant='h3'>{session?.user?.name?.toLocaleUpperCase()}</Typography>

            </Box>

            <Box className='flex space-x-2 mt-3 sm:mt-0'>
                <EditProfile/>
                <Button variant='contained' disableRipple><Link href={'/products/post'}> Post Item </Link></Button> 
            </Box>

        </Box>

        {/* Posts */}
        <Grid2 container>
            <Grid2>
                {data.map((v:{price:string,description:string,productName:string,image:string,_id:string},i:number)=>(
                    <div key={i}>
                    <PostsCard data={v}/>
                    </div>))}
            </Grid2>
            <Grid2>
                
            </Grid2>
        </Grid2>



    </div>
  )
}

export default page