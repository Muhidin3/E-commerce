import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import HeaderProducts from './small/HeaderProducts';
import { auth } from '../api/auth/[...nextauth]/auth';
import ProfileWithDropdown from './ProfileWithDropdown';
import { Box } from '@mui/material';


const Header: React.FC = async () => {
  const session  = await auth()
  const style = {
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: '#2196f3', // Blue color
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
          <Typography variant="h6" style={style.title}>
            <Link href={'/'}>E-com</Link>
          </Typography>

           
              <Link href={'/'} style={{marginLeft:'20px',color:'#fff',textTransform:'none'}}>Home</Link>
              <Link href={'/'} style={{marginLeft:'20px',color:'#fff',textTransform:'none'}}><HeaderProducts/></Link>
              <Link href={'/'} style={{marginLeft:'20px',color:'#fff',textTransform:'none'}}>About Us</Link>
              <Link href={'/'} style={{marginLeft:'20px',color:'#fff',textTransform:'none'}}>Contact</Link>
              {!session && <><Link href={'/auth/login'} style={{marginLeft:'20px',color:'#fff',textTransform:'none'}}>Login</Link>
              <Link href={'/auth/register'} style={{marginLeft:'20px',color:'#fff',textTransform:'none'}}>Signup</Link></>}
              {session &&
              <Box style={{marginLeft:'20px',color:'#fff',textTransform:'none'}}><ProfileWithDropdown/></Box>
              }
            
          
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
