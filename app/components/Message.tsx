'use client'

import { Box, Slide, SlideProps, Snackbar, SnackbarContent } from "@mui/material"
import { useState } from "react";


function Message({bool,message='',type='info'}:{bool?:boolean,message?:string,type?:string}) {
  const [show,setShow] = useState(bool)

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
  }

  setTimeout(() => {
    setShow(false)
  }, 2000);
  

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setShow(false);
  };

    return (
    <>
    <Box sx={{bgcolor:'green'}}>

      <Snackbar open={show} 
              autoHideDuration={3000} 
              onClose={handleClose} 
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              message={message}
              TransitionComponent={SlideTransition}
              >
      <SnackbarContent
          sx={{
            backgroundColor: type=='error'?'red':type=='sucess'?'green':'blue', // dark gray
            color: '#fff',
            borderRadius: '8px',
            px: 3,
            py: 1.5,
            boxShadow: 3,
            fontSize: '0.95rem',
          }}
          message={message}
        />


              </Snackbar>
    </Box>

      
    </>
    
  )
}

export default Message