'use client'
import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'

function MyLoading({bool=true,message}:{bool?:boolean,message?:string}) {
  const [boool,setBool] = useState(bool) 

    if (boool) {
      return (
        <div onClick={()=>setBool(false)} className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-white/10'>
          <Box>
            <Typography>
              {message ? message : 'Loading...'}
            </Typography>
      <Box display="flex" gap={1}>
        {[...Array(4)].map((_, i) => (
          <Box
            key={i}
            width={10}
            height={40}
            borderRadius={1}
            bgcolor="primary.main"
            sx={{
              animation: `grow 1s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
              '@keyframes grow': {
                '0%, 100%': { height: 10 },
                '50%': { height: 30 },
              },
            }}
          />
        ))}
      </Box>
    </Box>
        </div>
      )
    }
  
  return (
<></>
  ) 
}

export default MyLoading    
//that cool looking placeholder card 
    //       <Box p={2} maxWidth={400}>
    //   <Skeleton variant="rectangular" height={200} />
    //   <Skeleton variant="text" />
    //   <Skeleton variant="text" width="60%" />
    // </Box>

// className='flex justify-center items-center h-screen absolute w-full bg-white z-50 opacity-50'