'use client'
import { CircularProgress } from '@mui/material'
import React, { useState } from 'react'

function MyLoading({bool}:{bool:boolean}) {
  const [boool,setBool] = useState(bool) 

    if (boool) {
      return (
        <div onClick={()=>setBool(false)} className='flex justify-center items-center h-screen absolute w-full bg-white z-50 opacity-50'>
          <CircularProgress />
        </div>
      )
    }
  
  return (
<></>
  )
}

export default MyLoading    