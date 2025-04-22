import React from 'react'
import Header from '../components/Header'
import { Avatar, Button, Grid2, Typography } from '@mui/material'
import PostsCard from '../components/PostsCard'
import { auth } from '../api/auth/[...nextauth]/auth'
import Link from 'next/link'
import axios from 'axios'

async function page() {
    const session = await auth()

        const res = await axios.get(`http://localhost:3000/api/userProducts?name=${session?.user?.id}`)
        const data = res.data.data;
        
    
  return (
    <div>
        <Header/>

        {/* profile */}
        <Grid2 container className="p-3 bg-gray-100 m-3 rounded-md relative">

            <Grid2 sx={{ml:2,}} >
                <div className="inline-block mb-2" style={{marginRight:'5%'}}>
                <Avatar sx={{width:100,height:100}}><Typography variant='h2'>{session?.user?.name?.slice(0,1).toLocaleUpperCase() || 'P'}</Typography> </Avatar>
                </div>

                <Typography variant='h4' sx={{mb:1,display:'inline-block',fontSize:'3rem'}}>{session?.user?.name?.toLocaleUpperCase()}</Typography>
                <Typography variant='body2'sx={{display:'block'}}> quam repellat quas deleniti soluta? Ex quaerat quam eaque debitis? Amet fugiat voluptates doloremque?</Typography>
            </Grid2>
            <Grid2 sx={{ml:'auto',mr:2,mt:2}} className="absolute right-0">
                <Button variant='contained' disableRipple><Link href={'/products/post'}>Post Item</Link></Button> 
            </Grid2>
        </Grid2>

        {/* Posts */}
        <Grid2 container>
            <Grid2>
                {data.map((v:{price:number,description:string,productName:string,image:string,_id:string},i:number)=>(
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