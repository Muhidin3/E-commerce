'use client'
import { Avatar, Box, useTheme } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import Logout from './Logout'


function ProfileWithDropdown({user}:{user:string}) {
    const [isHovered,setIsHovered] = useState(false) 
    const handleMouseLeave = ()=>{
      setIsHovered(false)
    }
    const theme = useTheme()


 

  return (
    <div onMouseEnter={()=>setIsHovered(true)} className="">
        <Avatar>{user.toLocaleUpperCase().slice(0,1)}</Avatar>

     {isHovered && <div className="" >
        <Box>

            <div className="absolute shadow-md rounded-md z-1 right-7 w-40" onMouseLeave={handleMouseLeave} 
                 style={{backgroundColor:theme.palette.background.paper,color:theme.palette.text.primary}}>
                <ul className="p-2">
                    <Link href={'/profile'}> <li className="p-2 hover:bg-gray-200 cursor-pointer">Profile </li></Link>
                    <Link href={'/Settings'}><li className="p-2 hover:bg-gray-200 cursor-pointer">Settings</li></Link>
                    <li className="p-2 hover:bg-gray-200 cursor-pointer"><Logout/></li>
                </ul>
            </div>
        </Box>
        </div>}
    
    </div>
  )
}

export default ProfileWithDropdown