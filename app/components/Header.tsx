import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import HeaderProducts from './small/HeaderProducts';
import { auth } from '../api/auth/[...nextauth]/auth';
import ProfileWithDropdown from './ProfileWithDropdown';
import { Box } from '@mui/material';
import { Message } from '@mui/icons-material';
import ColourMode from './small/ColourMode';





const Header = async () => {
  const session  = await auth()
  const style = {
    root: {
      flexGrow: 1,
    },
    appBar: {
    
    },
    title: {
      flexGrow: 1,
    },
    link: {
      marginLeft: '20px',
      color: '#fff',
      textTransform: 'none',
    },
  }
  return (
    <div style={style.root}>
      <AppBar position="static" style={style.appBar}>
        <Toolbar>
          <Typography variant="h6" style={style.title} className='text-white text-nowrap'>
            <Link href={'/'}>E-com</Link>
          </Typography>

           
              {session &&<HeaderProducts />}
              
              {!session && <>
              <Link href={'/auth/login'} style={{marginLeft:'20px',color:'#fff',textTransform:'none'}}>Login</Link>
              <Link href={'/auth/register'} style={{marginLeft:'20px',color:'#fff',textTransform:'none'}}>Signup</Link></>}
              <ColourMode/>
                <Box style={{marginLeft:'20px',color:'text.main',textTransform:'none',border:'1px solid #fff',borderRadius:'10px',padding:'5px'}}>
                    <Link href={'/message'}><Message/></Link> 
                </Box>
              
              {session &&
              <Box style={{marginLeft:'20px',color:'#fff',textTransform:'none'}}>
                <ProfileWithDropdown user={session.user?.name as string}/>
              </Box>
              }
            
          
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
