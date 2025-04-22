'use client'
import {Typography } from '@mui/material'
import React from 'react'
import { signOut } from "next-auth/react";


function Logout() {

    const handleClick = ()=>{
        signOut({callbackUrl: '/'})
    }
  return (
    <Typography variant='body1' onClick={handleClick}>Logout</Typography>
  )
}

export default Logout

