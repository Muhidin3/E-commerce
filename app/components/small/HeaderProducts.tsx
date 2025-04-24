"use client"
import {  KeyboardArrowDownRounded, KeyboardDoubleArrowDown } from '@mui/icons-material'
import { Box,List, ListItem, useTheme } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


function HeaderProducts() {
    const [hover,setHover] = useState(false)
    const theme = useTheme()
    const [width,setwidth]= useState(1000)

    useEffect(()=>{
      setwidth(window.innerWidth)

    }, [])
    if(width<=600){
      return (
        <>
      <div className='inline-block duration-150' style={{marginLeft:'20px',color:'#fff',textTransform:'none'}} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
      Categories{hover ? <KeyboardDoubleArrowDown/> : <KeyboardArrowDownRounded/>}

      {hover && (
      <Box sx={{}}>
        <List style={{position:'fixed',margin:0,padding:0,borderRadius:'10px',backgroundColor:theme.palette.background.paper,color:theme.palette.text.primary}} className='z-10'>
            <ListItem sx={{":hover":{bgcolor:'rgba(38, 126, 214, 0.3)',scale:1.02,borderRadius:'10px 10px 0 0'},padding:'10px 10px',pl:2,pr:10}}>Houses</ListItem>
            <ListItem sx={{":hover":{bgcolor:'rgba(38, 126, 214, 0.3)',scale:1.02},padding:'10px 10px',pl:2,pr:10}}>Cars</ListItem>
            <ListItem sx={{":hover":{bgcolor:'rgba(38, 126, 214, 0.3)',scale:1.02},padding:'10px 10px',pl:2,pr:10}}>Electronics</ListItem>
            <ListItem sx={{":hover":{bgcolor:'rgba(38, 126, 214, 0.3)',scale:1.02},padding:'10px 10px',pl:2,pr:10}}>Jobs</ListItem>
            <ListItem sx={{":hover":{bgcolor:'rgba(38, 126, 214, 0.3)',scale:1.02},padding:'10px 10px',pl:2,pr:10}}>Services</ListItem>
        </List>
        
      </Box>
      )}                           
      </div>
        </>
      )
    }
  return (
    <>
    <Link href={'/'} style={{marginLeft:'20px',color:'#fff',textTransform:'none'}}>Home</Link>
      <div className='inline-block duration-150' style={{marginLeft:'20px',color:'#fff',textTransform:'none'}} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
      Categories{hover ? <KeyboardDoubleArrowDown/> : <KeyboardArrowDownRounded/>}

      {hover && (
      <Box sx={{}}>
        <List style={{position:'fixed',margin:0,padding:0,borderRadius:'10px',backgroundColor:theme.palette.background.paper,color:theme.palette.text.primary}} className='z-10'>
            <ListItem sx={{":hover":{bgcolor:'rgba(38, 126, 214, 0.3)',scale:1.02,borderRadius:'10px 10px 0 0'},padding:'10px 10px',pl:2,pr:10}}>Houses</ListItem>
            <ListItem sx={{":hover":{bgcolor:'rgba(38, 126, 214, 0.3)',scale:1.02},padding:'10px 10px',pl:2,pr:10}}>Cars</ListItem>
            <ListItem sx={{":hover":{bgcolor:'rgba(38, 126, 214, 0.3)',scale:1.02},padding:'10px 10px',pl:2,pr:10}}>Electronics</ListItem>
            <ListItem sx={{":hover":{bgcolor:'rgba(38, 126, 214, 0.3)',scale:1.02},padding:'10px 10px',pl:2,pr:10}}>Jobs</ListItem>
            <ListItem sx={{":hover":{bgcolor:'rgba(38, 126, 214, 0.3)',scale:1.02},padding:'10px 10px',pl:2,pr:10}}>Services</ListItem>
        </List>
        
      </Box>
      )}                           
      </div>

    <Link href={'/'} style={{marginLeft:'20px',color:'#fff',textTransform:'none'}}>About Us</Link>
    <Link href={'/'} style={{marginLeft:'20px',color:'#fff',textTransform:'none'}}>Contact</Link>
    </>
  )
}

export default HeaderProducts