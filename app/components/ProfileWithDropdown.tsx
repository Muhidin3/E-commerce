'use client'
import { Avatar } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import Logout from './Logout'

function ProfileWithDropdown() {
    const [isHovered,setIsHovered] = useState(false) 

    const handleMouseLeave = ()=>{
        setIsHovered(false)
    }

  return (
    <div onMouseEnter={()=>setIsHovered(true)} onMouseLeave={handleMouseLeave} className="">
        <Avatar>M</Avatar>
     {isHovered &&   <div className="">
            <div className="absolute bg-white shadow-md rounded-md z-1 right-10 w-40">
                <ul className="p-2 text-black">
                    <li className="p-2 hover:bg-gray-200 cursor-pointer"><Link href={'/profile'}>Profile</Link> </li>
                    <li className="p-2 hover:bg-gray-200 cursor-pointer"><Link href={'/Settings'}>Settings</Link></li>
                    <li className="p-2 hover:bg-gray-200 cursor-pointer"><Logout/></li>
                </ul>
            </div>
        </div>}
    
    </div>
  )
}

export default ProfileWithDropdown