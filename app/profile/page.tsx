import React from 'react'
import Header from '../components/Header'
import { Avatar, Box, Button, Grid2, Typography } from '@mui/material'
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
        <Grid2 container className="p-3 m-3 rounded-md relative">

            <Grid2 sx={{ml:2,width:'70%'}} >
                <Box className="inline-block mr-10" sx={{width:100,height:100}}>
                    <Avatar sx={{width:100,height:100}}>
                        <Typography variant='h2'>
                            {session?.user?.name?.slice(0,1).toLocaleUpperCase() || 'P'}
                        </Typography>
                    </Avatar>
                </Box>
                <Typography variant='h3' sx={{display:'inline-block'}}>{session?.user?.name?.toLocaleUpperCase()}</Typography>

            </Grid2>

            <EditProfile/>
            <Grid2 sx={{ml:'auto',mr:2,mt:2}} className="absolute right-0 bottom-0">
                <Button variant='contained' disableRipple><Link href={'/products/post'}> Post Item </Link></Button> 
            </Grid2>
        </Grid2>

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