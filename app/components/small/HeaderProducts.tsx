"use client"
import {  KeyboardArrowDownRounded, KeyboardDoubleArrowDown } from '@mui/icons-material'
import { List, ListItem } from '@mui/material'
import React, { useState } from 'react'


function HeaderProducts() {
    const [hover,setHover] = useState(false)
  return (
    <div className='inline-block duration-150' onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
                                >
    Categories{hover ? <KeyboardDoubleArrowDown/> : <KeyboardArrowDownRounded/>}
    {hover && (
    <div>
        <List style={{position:'fixed',margin:0,padding:0,borderRadius:'10px'}} className='bg-blue-500 z-10'>
            <ListItem sx={{":hover":{bgcolor:'#267ed6',scale:1.02},padding:'10px 10px',pl:2,pr:10}}>Houses</ListItem>
            <ListItem sx={{":hover":{bgcolor:'#267ed6',scale:1.02},padding:'10px 10px',pl:2,pr:10}}>Cars</ListItem>
            <ListItem sx={{":hover":{bgcolor:'#267ed6',scale:1.02},padding:'10px 10px',pl:2,pr:10}}>Electronics</ListItem>
            <ListItem sx={{":hover":{bgcolor:'#267ed6',scale:1.02},padding:'10px 10px',pl:2,pr:10}}>Jobs</ListItem>
            <ListItem sx={{":hover":{bgcolor:'#267ed6',scale:1.02},padding:'10px 10px',pl:2,pr:10}}>Services</ListItem>
       </List>
    </div>
    )}
                                
                                
    </div>
  )
}

export default HeaderProducts