'use client'
import {Typography } from '@mui/material'
import React, { useState } from 'react'
import { signOut } from "next-auth/react";
import MyLoading from './MyLoading';


function Logout() {
  const [loading,setLoading] = useState(false)
  const [loadingMessage,setLoadingMessage] = useState('')

    const handleClick = ()=>{
      setLoadingMessage('Logging out...')
      setLoading(true)
        signOut({callbackUrl: '/'})
    }

  if (loading) {
    return(<MyLoading message={loadingMessage} />)
    
  }
  return (
    <Typography variant='body1' onClick={handleClick}>Logout</Typography>
  )
}

export default Logout

